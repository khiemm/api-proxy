// const fleetlogRequestPromised = require("../lib/customRequest");
// const sessionHelper = require("../lib/sessionHelper");
// const client_id = config.get("oauth").client_id;
// const client_secret = config.get("oauth").client_secret;
// const allowedContinue = config.get("sso.allowedContinue");
// const FleetlogError = require("../lib/error");

module.exports = function (app) {
  app.all("/v2/demo/token", body, getTokens, sendOk);
  app.all("/v2/token", body, getTokens, sendOk);
  return app.post("/v2/login", body, getTokens, sendOk);
};

body = function (req, res, next) {
  var continueTo, isAllowedURL;
  continueTo = req.body["continue"];
  if (continueTo) {
    isAllowedURL = allowedContinue.some(function (url) {
      return continueTo.startsWith(url);
    });
    // if (!isAllowedURL) {
    //   return next(new FleetlogError.Safe("Invalid parameter `continue`."));
    // }
  }
  res.locals = {
    continue: continueTo,
  };
  return next();
};

getTokens = function (req, res, next) {
  var auth_string, customHeaders, myBody;
  myBody = req.body;
  auth_string = new Buffer("" + ":" + "").toString("base64");
  myBody.grant_type = "password";
  myBody.scopes = "read:places";
  if (!myBody.username) {
    myBody.username = myBody.email;
  }
  customHeaders = {
    Authorization: "Basic " + auth_string,
    ContentType: "application/x-www-form-urlencoded",
    XForwardedFor: req.ip,
  };
  return res.json(1);
  // return fleetlogRequestPromised
  //   .handle(req.method, "/v2/token", myBody, null, customHeaders)
  //   .tap(function (response) {
  //     var responseBody;
  //     responseBody = response.body;
  //     return sessionHelper.setSessionAuth(req, responseBody);
  //   })
  //   .then(function () {
  //     return next();
  //   })
  //   .catch(next);
};

sendOk = function (req, res, next) {
  res.status(200);
  return res.send();
};

handleRedirect = function (req, res, next) {
  var continueTo;
  continueTo = res.locals["continue"] || config.get("sso.baseURL");
  return res.redirect(302, continueTo);
};
