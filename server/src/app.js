const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const enforce = require("express-sslify");

const {
  checkDbConnection,
} = require("./routes/_middlewares/check-db-connection.mw");
const apiRoutes = require("./routes/api.router");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.json());
app.use(compression());
if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

//app.use(express.static(path.join(__dirname, "..", "public")));

app.use(checkDbConnection, apiRoutes);

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

module.exports = app;
