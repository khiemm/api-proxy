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
  secret: "",
  resave: false,
  saveUninitialized: false,
  key: "",
  cookie: COOKIES,
});

module.exports = sessionMiddleware;
