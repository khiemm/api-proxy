const contentLength = require("express-content-length-validator");
const methodOverride = require("method-override");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const validator = require("../lib/validator");

const MAX_CONTENT_LENGTH_ACCEPTED = 9999;

module.exports = function (app) {
  var ref;
  app.disable("x-powered-by");
  if ((ref = process.env.NODE_ENV) === "production" || ref === "api-dev") {
    app.set("trust proxy", 1);
    app.use(
      morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ":referrer" ":user-agent"'
      )
    );
  } else {
    app.use(morgan("dev"));
  }
  app.use(helmet());
  app.use(helmet.noCache());
  app.use(
    contentLength.validateMax({
      max: MAX_CONTENT_LENGTH_ACCEPTED,
      status: 400,
      message: "Large Payload",
    })
  );
  app.use(methodOverride("X-HTTP-Method-Override"));
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  return app.use(
    expressValidator({
      errorFormatter: validator,
    })
  );
};
