#!/bin/bash

echo "📦 建立目錄結構..."
mkdir -p packages/sdk/src
mkdir -p packages/policy-engine/src
mkdir -p packages/replay-cli/src
mkdir -p examples/openai-agent
mkdir -p sessions
mkdir -p .github/workflows

echo "📝 建立 types.ts"
cat > packages/sdk/src/types.ts << 'TYPES'
export type Decision = 'ALLOW' | 'WARN' | 'BLOCK';
export type AgentEvent = {
  sessionId: string;
  tool: string;
  input: unknown;
  output?: unknown;
  latency: number;
  riskScore: number;
  timestamp: number;
  decision: Decision;
};
TYPES

echo "📝 建立 event-store.ts"
cat > packages/sdk/src/event-store.ts << 'EVENTSTORE'
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
EVENTSTORE

echo "📝 建立 policy engine"
cat > packages/policy-engine/src/engine.ts << 'POLICYENGINE'
import fs from 'fs';
import yaml from 'yaml';

export type PolicyDecision = 'ALLOW' | 'WARN' | 'BLOCK';

export function evaluatePolicy(
  tool: string,
  riskScore: number
): PolicyDecision {
  const policyFile = fs.readFileSync('ai-sentry.policy.yaml', 'utf-8');
  const policy = yaml.parse(policyFile);
  for (const rule of policy.rules) {
    if (rule.when?.['event.payload.tool'] === tool) {
      return rule.then.action;
    }
    if (riskScore > 0.8 && rule.then.action === 'WARN') {
      return 'WARN';
    }
  }
  return 'ALLOW';
}
POLICYENGINE

echo "📝 建立 trace.ts"
cat > packages/sdk/src/trace.ts << 'TRACE'
import { persistEvent } from './event-store';
import { AgentEvent } from './types';
import { evaluatePolicy } from '../../policy-engine/src/engine';

type TracePayload = {
  sessionId: string;
  payload: {
    tool: string;
    input: unknown;
  };
};

export async function trace({ sessionId, payload }: TracePayload) {
  const started = Date.now();
  const riskScore = Math.random();
  const decision = evaluatePolicy(payload.tool, riskScore);
  const latency = Date.now() - started;

  const event: AgentEvent = {
    sessionId,
    tool: payload.tool,
    input: payload.input,
    latency,
    riskScore,
    timestamp: Date.now(),
    decision,
  };

  persistEvent(event);

  if (decision === 'BLOCK') {
    console.log(\`❌ BLOCKED by policy: \${payload.tool}\`);
    return;
  }

  console.log(\`✔ traced tool=\${payload.tool} latency=\${latency}ms decision=\${decision}\`);
  return event;
}
TRACE

echo "📝 建立 SDK index.ts"
cat > packages/sdk/src/index.ts << 'SDKINDEX'
export * from './trace';
export * from './types';

export function init(config: { apiKey: string }) {
  console.log(\`🧠 AI Sentry initialized\`);
}
SDKINDEX

echo "📝 建立 replay.ts"
cat > packages/replay-cli/src/replay.ts << 'REPLAY'
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
REPLAY

echo "📝 建立 replay index"
cat > packages/replay-cli/src/index.ts << 'REPLAYINDEX'
#!/usr/bin/env node
import { replay } from './replay';
const sessionId = process.argv[2];
replay(sessionId);
REPLAYINDEX

echo "📝 建立 policy YAML"
cat > ai-sentry.policy.yaml << 'POLICYYAML'
rules:
  - id: block-email
    when:
      event.payload.tool: "email"
    then:
      action: "BLOCK"
  - id: warn-high-risk
    when:
      event.payload.riskScore > 0.8
    then:
      action: "WARN"
POLICYYAML

echo "📝 建立 example agent"
cat > examples/openai-agent/index.ts << 'EXAMPLE'
import { init, trace } from '../../packages/sdk/src';

init({ apiKey: 'demo-key' });

async function run() {
  await trace({
    sessionId: 'sess-1',
    payload: {
      tool: 'search',
      input: 'weather in Tokyo',
    },
  });

  await trace({
    sessionId: 'sess-1',
    payload: {
      tool: 'email',
      input: 'send confidential report',
    },
  });
}

run();
EXAMPLE

echo "📝 建立 .gitignore"
cat > .gitignore << 'GITIGNORE'
node_modules
dist
.env
GITIGNORE

echo "🎉 完成！AI Sentry MVP 已建立"
