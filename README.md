X-Powered-By is set by various servers to say what kind of server it is.
The X-Forwarded-For (XFF) header is a de-facto standard header for identifying the originating IP address of a client connecting to a web server
app.disable("x-powered-by");
app.set("trust proxy", 1);
https://expressjs.com/en/api.html#app.set
http://expressjs.com/en/guide/behind-proxies.html

cookie-parser
express-session
connect-redis