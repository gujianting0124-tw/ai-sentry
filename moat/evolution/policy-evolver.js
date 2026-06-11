export class PolicyEvolver {
  constructor() {
    this.history = [];
    this.weights = {
      allow: 1,
      deny: -1,
      unknown: 0
    };
  }

  record(event) {
    this.history.push({
      input: event.input,
      decision: event.decision,
      risk: event.risk || 0,
      timestamp: Date.now()
    });
  }

  evolve() {
    let riskSum = 0;
    let count = 0;

    for (const h of this.history) {
      if (h.decision === "deny") {
        riskSum += h.risk;
        count++;
      }
    }

    if (count === 0) return this.weights;

    const avgRisk = riskSum / count;

    // 🔥 核心：自動提高防禦敏感度
    if (avgRisk > 0.7) {
      this.weights.deny -= 0.1;
    }

    if (avgRisk < 0.3) {
      this.weights.allow += 0.05;
    }

    return this.weights;
  }

  snapshot() {
    return {
      weights: this.weights,
      historySize: this.history.length
    };
  }
}
