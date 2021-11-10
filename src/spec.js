const { welcome } = require("./ivr/handler");

describe("Welcome voice", () => {
  test("Should return greeting", async () => {
    const twiml = welcome();
    //const count = countWord(twiml);

    //expect(count("Gather")).toBe(2);
    //expect(count("Say")).toBe(2);

    expect(twiml).toContain('action="/ivr/action"');
    expect(twiml).toContain('numDigits="1"');
    expect(twiml).toContain('method="POST"');
    expect(twiml).toContain('loop="2"');

    expect(twiml).toContain("Thanks for calling Danny Tsui.");
  });
});
