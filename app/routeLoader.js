const errorHandler = require("../lib/errorHandler");

module.exports = function (app) {
  // require("./registration")(app);
  // require("./forgot")(app);
  // require("./reset")(app);
  // require("./contact")(app);
  // require("./invoice")(app);
  // require("./authorize")(app);
  // require("./logout/controllers")(app);
  require("./login")(app);
  // require("./saml/index")(app);
  // require("./updateMe/controllers")(app);
  // app.get("/v2/version", function (req, res) {
  //   return res.status(200).send();
  // });
  // app.get("/v2/unauthorized", function (req, res) {
  //   return res.status(401).send({
  //     status: 401,
  //     error: "Unauthorized",
  //     message: "Authentication is required.",
  //   });
  // });
  // require("./proxy")(app);
  // return app.use(errorHandler.defaultHandler);
};
