# Policy Engine (skeleton)

This directory contains a minimal Policy Engine interface for the AI Sentry MVP.

API
- evaluate(request, enriched)
  - request: original request object (may include indicators)
  - enriched: optional enrichment result from threatintel client
  - returns: { decision: 'ALLOW'|'DENY'|'FLAG', matched_rules: [ ... ] }

Notes
- The current implementation is a small, deterministic evaluator intended for demo and unit testing.
- Replace with a full rule parser/engine (loading YAML policies, condition evaluation, priorities) for production.
