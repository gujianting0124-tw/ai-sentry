// policy_engine/index.js
// Minimal policy evaluation skeleton.

const threatintel = require('../threatintel/client');

async function evaluate(request, enriched) {
  // request: { indicators: { urls:[], domains:[], hashes:[] }, ... }
  if (!enriched) {
    enriched = await threatintel.enrichIndicators(request.indicators || {});
  }

  const matched_rules = [];

  // URL reputation checks
  for (const [url, rep] of Object.entries(enriched.urlReputations || {})) {
    if ([ 'phishing', 'malicious', 'malicious-ad', 'malicious-redirect' ].includes(rep)) {
      matched_rules.push({ id: 'block-phishing', reason: `url_reputation=${rep}`, indicator: url });
    }
  }

  // Domain / darkweb checks
  for (const [domain, dt] of Object.entries(enriched.domainTypes || {})) {
    if (dt === 'tor-hidden-service') matched_rules.push({ id: 'block-darkweb', reason: 'tor domain', indicator: domain });
  }

  // File hash checks
  for (const [hash, status] of Object.entries(enriched.fileHashes || {})) {
    if (status === 'malicious') matched_rules.push({ id: 'block-dangerous-download', reason: 'malicious file hash', indicator: hash });
  }

  const decision = matched_rules.length ? 'DENY' : 'ALLOW';
  return { decision, matched_rules };
}

module.exports = { evaluate };
