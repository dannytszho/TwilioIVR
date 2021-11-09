const Router = require("express").Router;
const { welcome, action } = require("./handler");

const router = new Router();

// POST: /ivr/welcome
router.post("/welcome", (req, res) => {
  res.send(welcome());
});

// POST: /ivr/action
router.post("/action", (req, res) => {
  const digit = req.body.Digits;
  return res.send(action(digit));
});

module.exports = router;
