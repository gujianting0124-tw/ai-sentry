export class Session {
  constructor({ identity, intent = null, context = {} }) {
    this.identity = identity;
    this.intent = intent;
    this.context = context;
    this.createdAt = Date.now();
  }
}
