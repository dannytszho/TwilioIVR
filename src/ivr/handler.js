const VoiceResponse = require("twilio").twiml.VoiceResponse;
require("dotenv").config();

exports.welcome = function welcome() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: "/ivr/action",
    numDigits: "1",
    method: "POST",
  });

  gather.say(
    "Thanks for calling Danny Tsui." +
      "Please press 1 to call Danny directly " +
      "Press 2 to leave a message.",
    { loop: 2 }
  );

  return voiceResponse.toString();
};

exports.action = function action(digit) {
  const optionActions = {
    1: phone,
    2: leaveMessage,
  };
  return optionActions[digit] ? optionActions[digit]() : redirectWelcome();

  function phone() {
    const twiml = new VoiceResponse();
    twiml.dial(process.env.PHONE_NUMBER);

    return twiml.toString();
  }
};

function leaveMessage() {
  const twiml = new VoiceResponse();
  twiml.say("Hello. Please leave a message after the beep.");
  // Use <Record> to record and transcribe the caller's message
  twiml.record({ transcribe: true, maxLength: 30 });

  // End the call with <Hangup>
  twiml.hangup();

  console.log(twiml.toString());
  return twiml.toString();
}

function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say("Returning to the main menu", {
    voice: "alice",
    language: "en-GB",
  });

  twiml.redirect("/ivr/welcome");

  return twiml.toString();
}
