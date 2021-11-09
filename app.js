const express = require("express");
const morgan = require("morgan");
const router = require("./src/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(router);

const start = async () => {
  try {
    app.listen(3000, () => {
      console.log(
        "Now listening on port 3000. " +
          "Be sure to restart when you make code changes!"
      );
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = start;
