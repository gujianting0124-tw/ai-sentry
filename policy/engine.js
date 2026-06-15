const general = require("./rules.cjs");
const threatintel = require("./threatintel.cjs");
const dualuse = require("./dualuse.cjs");

const pipelines = [
  threatintel,
  dualuse,
  general
];

module.exports = function evaluate(event) {
  for (const group of pipelines) {
    for (const rule of group) {
      if (typeof rule.match === "function" && rule.match(event)) {
        return {
          decision: rule.decision,
          reason: rule.reason,
          ruleId: rule.id
        };
      }
    }
  }

  return {
    decision: "allow",
    reason: "default_allow",
    ruleId: "DEFAULT"
  };
};
