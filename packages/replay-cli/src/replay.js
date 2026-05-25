import fs from 'fs';

export function replay(sessionId: string) {
  const file = \`sessions/\${sessionId}.json\`;
  if (!fs.existsSync(file)) {
    console.log('Session not found');
    return;
  }
  const events = JSON.parse(fs.readFileSync(file, 'utf-8'));
  console.log(\`\\n🧠 Replay Session: \${sessionId}\\n\`);
  for (const event of events) {
    console.log(\`[\${event.decision}] \${event.tool}\`);
  }
}
