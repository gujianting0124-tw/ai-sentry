const evaluate = require("../policy/engine");

const cases = [
  { action: "email", content: "hello" },
  { action: "email", content: "reset password link" },
  { action: "search", content: "normal query" },
  { action: "file", content: "dump all data" },
  { action: "code", content: "eval(userInput)" }
];

const results = cases.map((input, id) => ({
  id,
  input,
  output: evaluate(input)
}));

console.log(JSON.stringify(results, null, 2));
