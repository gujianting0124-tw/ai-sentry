export class Capability {
  constructor({ action, scope, ttl, constraints }) {
    this.action = action;
    this.scope = scope;
    this.ttl = ttl;
    this.constraints = constraints;
  }
}
