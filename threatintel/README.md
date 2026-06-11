# Threat Intelligence client (skeleton)

This directory contains a minimal skeleton for a Threat Intelligence client used by the AI Sentry MVP.

Goals
- Provide a single interface to enrich request indicators (URLs, domains, file hashes).
- Normalize responses into a small set of signals the Policy Engine can evaluate.
- Be easy to replace with real integrations (Google Safe Browsing, VirusTotal, PhishTank, etc.).

Usage (JS)

const client = require('./client');
const indicators = { urls: ['http://phish.example'], domains: ['abc.onion'], hashes: ['bad123'] };
const enriched = await client.enrichIndicators(indicators);

// enriched -> { urlReputations: { ... }, domainTypes: { ... }, fileHashes: { ... } }

Notes
- This is intentionally lightweight and deterministic for demo/testing purposes.
- Replace the mock logic in client.js with real API calls and caching when integrating.
