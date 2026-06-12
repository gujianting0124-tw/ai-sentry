function evaluateCondition(event, condition) {
  const value = event[condition.field];

  switch (condition.op) {
    case ">":
      return value > condition.value;
    case "<":
      return value < condition.value;
    case "contains":
      return typeof value === "string" && value.includes(condition.value);
    default:
      return false;
  }
}

function applyPolicy(event, rules) {
  for (const rule of rules) {
    if (rule.tool !== event.tool) continue;

    let allMatch = true;

    for (const cond of rule.conditions) {
      if (!evaluateCondition(event, cond)) {
        allMatch = false;
        break;
      }
    }

    if (allMatch) {
      return {
        decision: rule.decision,
        reason: rule.reason
      };
    }
  }

  return {
    decision: "ALLOW",
    reason: "No matching rule, default allow."
  };
}

module.exports = { applyPolicy };
