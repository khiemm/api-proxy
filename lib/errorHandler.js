const logger = require("./logger");

const FleetlogError = require("./error");

const errorHandler = {
  defaultHandler: function (err, req, res, next) {
    var error, message, status;
    if (err instanceof FleetlogError.Safe) {
      if (err.status === 429) {
        res.status(429);
        res.send(JSON.parse(err.body));
        return;
      }
      logger.warn("error: ", err.message);
      message = err.message;
      status = err.status || 400;
    } else {
      if (err.message) {
        logger.warn("API error: ", err.message);
      } else {
        logger.warn("API error: ", JSON.stringify(err.stack));
      }
      logger.warn("API error: ", err);
      status = isNaN(err.status) ? 500 : err.status;
      if (status !== 500) {
        message = err.message || "Error";
      }
    }
    error = (function () {
      switch (status) {
        case 400:
          return "Bad Request";
        case 401:
          return "Unauthorized";
        case 404:
          return "Not Found";
        case 405:
          return "Method Not Allowed ";
        default:
          return "Internal Server Error";
      }
    })();
    res.status(status);
    return res.send({
      status: status,
      error: error,
      message: message,
    });
  },
};

module.exports = errorHandler;
