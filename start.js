const apiProxy = require("./server");
const express = require("express");
const app = express();

const proxyOptions = {
  client_id: "",
  client_secret: "",
  oAuthTarget: "",
  cookieSecret: "",
};

const LISTEN_PORT = "3030";

apiProxy.web(app, proxyOptions);

const server = app.listen(LISTEN_PORT, "0.0.0.0", function (err) {
  if (!!err) {
    console.log(err);
    return;
  }
  return console.log("proxy running at 0.0.0.0:" + LISTEN_PORT);
});
