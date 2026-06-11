import { AuditLogger } from "../audit/AuditLogger.js";

export class SentryKernel {
  constructor(options = {}) {
    this.audit = new AuditLogger();
    this.options = options;
  }

  startSession(session) {
    return session;
  }

  async run({ session, action, input }) {
    const event = {
      timestamp: Date.now(),
      session,
      action,
      input,
      decision: "allow"
    };

    this.audit.record(event);

    return {
      output: `Executed action: ${action}`,
      event
    };
  }
}
