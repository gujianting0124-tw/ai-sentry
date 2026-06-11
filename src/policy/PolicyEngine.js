export class PolicyEngine {
  constructor(policies = []) {
    this.policies = policies;
  }

  evaluate(session, action) {
    return {
      allow: true,
      reason: "default-allow"
    };
  }
}
