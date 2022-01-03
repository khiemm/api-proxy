const cookieParser = require("cookie-parser");
const uuidV1 = require("uuid/v1");
const passport = require("passport");
// require("./lib/samlPassport");
// const envMiddleware = require("./app/envMiddleware");
const sessionMiddleware = require("./lib/sessionMiddleware");
const sessionHelper = require("./lib/sessionHelper");
// const FleetlogError = require("./lib/error");
// const UserClient = require("./lib/customRequest/user");
// const refreshRequest = require("./app/refresh");

module.exports.web = function (app, options) {
  const cookieSecret = options.cookieSecret || uuidV1();
  require("./app/middlewares")(app);
  app.use(cookieParser(cookieSecret));
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
  // envMiddleware(app);
  app.use(refreshMiddleware);
  app.use(serializeUser);
  return require("./app/routeLoader")(app);
};

serializeUser = function (req, res, next) {
  var accessToken, user;
  if (!sessionHelper.getAccessToken(req)) {
    return next();
  }
  user = sessionHelper.getUser(req);
  if (sessionHelper.getUser(req)) {
    req.user = Object.assign(user, {
      auth: req.session.auth,
    });
    return next();
  }
  accessToken = sessionHelper.getAccessToken(req);
  return UserClient.getIdentity(accessToken)
    .then(function (user) {
      sessionHelper.setSessionUser(req, user);
      req.user = Object.assign(user, {
        auth: req.session.auth,
      });
      return next();
    })
    .catch(function () {
      req.session.destroy();
      return next(new FleetlogError.Unauthorized("Session expired."));
    });
};

refreshMiddleware = function (req, res, next) {
  var currentDate, expiresIn, refreshToken;
  if (!req.session || !req.session.auth) {
    return next();
  }
  expiresIn = req.session.auth.expiresIn;
  currentDate = new Date();
  if (expiresIn > currentDate.getTime()) {
    return next();
  }
  refreshToken = sessionHelper.getRefreshToken(req);
  return refreshRequest
    .refresh(refreshToken)
    .then(function (result) {
      var responseBody;
      responseBody = result.body;
      responseBody.refresh_token = refreshToken;
      sessionHelper.setSessionAuth(req, responseBody);
      return next();
    })
    .catch(function () {
      req.session.destroy();
      return next(
        new FleetlogError.Unauthorized("Session expired or logged out.")
      );
    });
};
