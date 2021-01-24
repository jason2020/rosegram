const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const router = require("./routes.js");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started.");
});
