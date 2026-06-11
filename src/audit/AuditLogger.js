export class AuditLogger {
  constructor() {
    this.events = [];
  }

  record(event) {
    this.events.push(event);
  }

  all() {
    return this.events;
  }
}
