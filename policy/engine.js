const general = require("./rules.cjs");
const threatintel = require("./threatintel.cjs");
const dualuse = require("./dualuse.cjs");

const pipelines = [
  { name: "threatintel", rules: threatintel },
  { name: "dualuse", rules: dualuse },
  { name: "general", rules: general }
];

function applyPolicy(event) {
  for (const group of pipelines) {
    for (const rule of group.rules) {
      if (typeof rule.match === "function" && rule.match(event)) {
        return {
          decision: rule.decision,
          reason: rule.reason,
          ruleId: rule.id,
          pipeline: group.name
        };
      }
    }
  }

  return {
    decision: "allow",
    reason: "default_allow",
    ruleId: "DEFAULT",
    pipeline: "none"
  };
}

module.exports = { applyPolicy };
