const Router = require("express").Router;
const { welcome, action, leaveMessage } = require("./handler");

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

// POST: /ivr/message
router.post("/message", (req, res) => {
  const message = req.body;
  return res.type("text/xml").send(leaveMessage(message));
});

module.exports = router;
