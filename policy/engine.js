module.exports = function evaluate(event) {
  const rules = require("./rules.cjs");
  for (const rule of rules) {
    if (rule.match(event)) return rule.decision;
  }
  return "allow";
};
