const encryptionHelper = require("../lib/simpleEncryptor");
const accessToCookies = "1";
const oldCookies = {};

const SessionHelper = {
  clearCookiesOld: function (res) {
    res.clearCookie("fleetlog_token", oldCookies);
    return res.clearCookie("f_refresh_token", oldCookies);
  },
  getAccessTokenOld: function (req) {
    return req[accessToCookies].fleetlog_token;
  },
  getRefreshTokenOld: function (req) {
    var refreshToken;
    refreshToken = encryptionHelper.decryptString(
      req[accessToCookies].f_refresh_token
    );
    return refreshToken;
  },
  getAccessToken: function (req) {
    var auth, ref;
    auth = (ref = req.session) != null ? ref.auth : void 0;
    if (!auth) {
      return null;
    }
    return auth.accessToken;
  },
  getUser: function (req) {
    var ref;
    return (ref = req.session) != null ? ref.user : void 0;
  },
  getRefreshToken: function (req) {
    var auth, ref;
    auth = (ref = req.session) != null ? ref.auth : void 0;
    if (!auth) {
      return null;
    }
    return auth.refreshToken;
  },
  setSessionAuth: function (req, responseBody) {
    var currentDate, sess;
    if (!responseBody) {
      throw new TypeError("Missing parameter `responseBody`.");
    }
    if (!responseBody.access_token) {
      throw new TypeError(
        "Invalid parameter `responseBody`. Missing parameter access_token."
      );
    }
    currentDate = new Date();
    sess = req.session;
    sess.auth = sess.auth || {};
    sess.auth.accessToken = responseBody.access_token;
    sess.auth.expiresIn = currentDate.setSeconds(
      currentDate.getSeconds() + responseBody.expires_in
    );
    if (responseBody.refresh_token) {
      return (sess.auth.refreshToken = responseBody.refresh_token);
    }
  },
  setSessionUser: function (req, user) {
    var sess;
    if (!user) {
      throw new TypeError("Missing parameter `user`.");
    }
    sess = req.session;
    return (sess.user = user);
  },
};

module.exports = SessionHelper;
