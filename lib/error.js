const util = require("util");
const logger = require("./logger");
Error.prototype.body = {};

const FleetlogError = {
  Safe: function (message, status) {
    Error.captureStackTrace(this, this.constructor);
    this.name = "Safe";
    this.message = message;
    return (this.status = status || 400);
  },
  Unauthorized: function (message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = "Unauthorized";
    this.message = message;
    return (this.status = 401);
  },
  Forbidden: function (message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = "Forbidden";
    this.message = message || "Forbidden";
    return (this.status = 403);
  },
  TooManyRequests: function (body) {
    Error.captureStackTrace(this, this.constructor);
    this.name = "TooManyRequests";
    this.message = "Too many requests";
    this.status = 429;
    return (this.body = JSON.stringify(body));
  },
};

util.inherits(FleetlogError.Safe, Error);

util.inherits(FleetlogError.Unauthorized, FleetlogError.Safe);

util.inherits(FleetlogError.TooManyRequests, FleetlogError.Safe);

util.inherits(FleetlogError.Forbidden, FleetlogError.Safe);

module.exports = FleetlogError;
