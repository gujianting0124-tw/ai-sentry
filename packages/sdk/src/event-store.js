import fs from 'fs';
import path from 'path';
import { AgentEvent } from './types';

const SESSION_DIR = path.join(process.cwd(), 'sessions');

export function persistEvent(event: AgentEvent) {
  if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
  }
  const file = path.join(SESSION_DIR, \`\${event.sessionId}.json\`);
  let events: AgentEvent[] = [];
  if (fs.existsSync(file)) {
    events = JSON.parse(fs.readFileSync(file, 'utf-8'));
  }
  events.push(event);
  fs.writeFileSync(file, JSON.stringify(events, null, 2));
}
