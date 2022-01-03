const config = require("config");

const session = require("express-session");

const RedisStore = require("connect-redis")(session);

const COOKIES = {
  httpOnly: true,
  maxAge: 6000000,
};

const sessionMiddleware = session({
  store: new RedisStore({
    host: "localhost",
  }),
  secret: "5e6H9dp9",
  resave: false,
  saveUninitialized: false,
  key: "fleetlog_sid",
  cookie: COOKIES,
});

module.exports = sessionMiddleware;
