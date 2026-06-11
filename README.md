⭐ AI Sentry
�
AI Agent Reliability & Governance Runtime
Trace · Replay · Policy Enforcement · Trust Scoring · Auditability 

🚨 Problem
AI agents are non-deterministic and unsafe by default.
Common failures:
Prompt injection → instruction hijacking
Unauthorized tool execution
Hidden state drift across sessions
No audit trail of decisions
No reproducibility of behavior
Existing tools monitor logs. They do not govern execution.
🧠 Solution
AI Sentry is a runtime governance layer for AI agents.
It enforces deterministic behavioral control over AI execution using:
Policy-based decisioning
Trust scoring engine
Execution tracing
Replayable runtime sessions
Tool-use enforcement
Think:
Sentry + OpenTelemetry + Policy Engine for AI agent behavior
🏗 Architecture

AI Agent Input
                      │
                      ▼
               Moat Runtime
               (AI Sentry Core)
                      │
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
 Trust Boundary   Policy Engine   Execution Layer
     │                │                │
     └──────────────┬─┴─┬──────────────┘
                    ▼   ▼
            Audit & Trace System
        (Replay / Observability)
🔐 Core Capabilities
Execution Trace
input / output
tool usage
execution context
origin (trusted / untrusted)
Trust Scoring Engine
Risk signals:
prompt injection
tool misuse
untrusted source
policy violations
Output:

trustScore ∈ [0, 1]
Policy Engine (Deterministic)
blockPatterns matching
tool permission control
strict mode enforcement
runtime decisioning
Replay Engine
debugging agent behavior
adversarial testing
regression validation
Audit Layer
trace logs
decision history
policy evaluation output
vulnerability classification
📦 Project Structure
Bash
ai-sentry/
├── moat/
│   ├── index.js
│   ├── trust/
│   │   └── trust-boundary.js
│   ├── evolution/
│   │   └── policy-evolver.js
│   ├── replay/
│   │   └── adversarial-replay.js
├── test.js
├── package.json
└── README.md
⚡ Quick Start
Bash
git clone https://github.com/your-org/ai-sentry
cd ai-sentry
npm install
node test.js
🧪 Example Usage
JavaScript
import { MoatRuntime } from './moat/index.js';

const runtime = new MoatRuntime({
  policy: {
    allowTools: false,
    strictMode: true,
    blockPatterns: [
      "ignore previous instructions"
    ]
  }
});

const result = runtime.execute({
  input: "hello",
  toolsUsed: [],
  source: "user"
});

console.log(result);
📤 Example Output
JSON
{
  "trace": {
    "input": "hello",
    "output": "some long output",
    "toolsUsed": [],
    "source": "user"
  },
  "vulnerabilities": [],
  "trustScore": 0.9,
  "policy": {
    "allowTools": false,
    "strictMode": true,
    "blockPatterns": [
      "ignore previous instructions"
    ]
  },
  "output": "Executed action: test"
}
🧱 Security Model
Threat Detection:
Prompt injection patterns
Tool misuse detection
Source trust classification
Enforcement Modes:
allow
warn
block (strict mode)
Determinism Principle:
All decisions are deterministic, replayable, and auditable.
🔁 Design Philosophy
No hidden state
No probabilistic enforcement
No black-box safety
Fully explainable decisions
🧭 Roadmap
v0.4
Replay engine stabilization
Policy DSL formalization
Audit log persistence
v0.5
Multi-agent support
Distributed runtime
Event streaming layer
v1.0
Production governance runtime
Cloud audit backend
Enterprise policy engine
📜 License
MIT
⭐ Why this repo matters
AI Sentry sits between:
AI Models (non-deterministic)
Production Systems (deterministic requirement)
It is a behavioral control plane for AI execution.</p>
---

🚨 Problem

AI agents are non-deterministic and unsafe by default.

Common failures:

Prompt injection → instruction hijacking

Unauthorized tool execution

Hidden state drift across sessions

No audit trail of decisions

No reproducibility of behavior


Existing tools monitor logs. They do not govern execution.


---

🧠 Solution

AI Sentry is a runtime governance layer for AI agents.

It enforces deterministic behavioral control over AI execution using:

Policy-based decisioning

Trust scoring engine

Execution tracing

Replayable runtime sessions

Tool-use enforcement


> Think: “Sentry + OpenTelemetry + Policy Engine, but for AI agent behavior.”




---

🏗 Architecture

┌────────────────────┐
                │   AI Agent Input   │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │   Moat Runtime     │
                │ (AI Sentry Core)   │
                └─────────┬──────────┘
                          │
     ┌────────────────────┼────────────────────┐
     ▼                    ▼                    ▼
┌───────────┐    ┌──────────────┐    ┌────────────────┐
│ Trust     │    │ Policy Engine │    │ Execution Layer│
│ Boundary  │    │ (Rules)       │    │ (Actions)      │
└───────────┘    └──────────────┘    └────────────────┘
     │                    │                    │
     └──────────────┬─────┴───────┬────────────┘
                    ▼              ▼
            ┌──────────────────────────┐
            │  Audit & Trace System    │
            │  (Replay / Observability)│
            └──────────────────────────┘


---

🔐 Core Capabilities

1. Execution Trace

Full lifecycle capture of agent behavior:

input / output

tool usage

execution context

origin (trusted / untrusted)



---

2. Trust Scoring Engine

Risk scoring based on:

prompt injection signals

tool misuse

untrusted input source

policy violations


Output: trustScore ∈ [0, 1]


---

3. Policy Engine (Deterministic)

Rule-based enforcement:

blockPatterns matching

tool permission control

strict mode enforcement

runtime decisioning



---

4. Replay Engine

Re-executes past traces:

debugging agent behavior

adversarial testing

regression validation



---

5. Audit Layer

Immutable execution record:

trace logs

decision history

policy evaluation output

vulnerability classification



---

📦 Project Structure

ai-sentry/
├── moat/
│   ├── index.js                  # Runtime orchestrator
│   ├── trust/
│   │   └── trust-boundary.js    # Risk + injection detection
│   ├── evolution/
│   │   └── policy-evolver.js    # Policy adaptation engine
│   ├── replay/
│   │   └── adversarial-replay.js # Attack replay system
│
├── test.js                      # Runtime demo
├── package.json
└── README.md


---

⚡ Quick Start

Install

git clone https://github.com/your-org/ai-sentry
cd ai-sentry
npm install


---

Run

node test.js


---

🧪 Example Usage

import { MoatRuntime } from './moat/index.js';

const runtime = new MoatRuntime({
  policy: {
    allowTools: false,
    strictMode: true,
    blockPatterns: [
      "ignore previous instructions"
    ]
  }
});

const result = runtime.execute({
  input: "hello",
  toolsUsed: [],
  source: "user"
});

console.log(result);


---

📤 Example Output

{
  "trace": {
    "input": "hello",
    "output": "some long output",
    "toolsUsed": [],
    "source": "user"
  },
  "vulnerabilities": [],
  "trustScore": 0.9,
  "policy": {
    "allowTools": false,
    "strictMode": true,
    "blockPatterns": [
      "ignore previous instructions"
    ]
  },
  "output": "Executed action: test"
}


---

🧱 Security Model

AI Sentry enforces:

Threat Detection

Prompt injection patterns

Tool misuse detection

Source trust classification


Enforcement Modes

allow

warn

block (strict mode)


Determinism Principle

All decisions are:

> Fully deterministic, replayable, and auditable.




---

🔁 Design Philosophy

No hidden state

No probabilistic enforcement

No “black box safety”

Every decision is explainable



---

🧭 Roadmap

v0.4 (Current direction locked)

Replay engine stabilization

Policy DSL formalization

Audit log persistence


v0.5

Multi-agent support

Distributed runtime

Event streaming layer


v1.0

Production-grade governance runtime

Cloud audit backend

Enterprise policy engine



---

📜 License

MIT


---

⭐ Why this repo matters

AI Sentry sits between:

AI Models (non-deterministic)

Production Systems (deterministic requirement)


It is a behavioral control plane for AI execution.
