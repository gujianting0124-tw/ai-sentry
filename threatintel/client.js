// threatintel/client.js
// Minimal Threat Intelligence client skeleton for demo purposes.

async function enrichIndicators(indicators) {
  // indicators: { urls: [], domains: [], hashes: [] }
  const results = { urlReputations: {}, domainTypes: {}, fileHashes: {} };

  (indicators.urls || []).forEach((url) => {
    if (url.includes('phish') || url.includes('malicious')) results.urlReputations[url] = 'phishing';
    else if (url.includes('ad-redirect')) results.urlReputations[url] = 'malicious-ad';
    else results.urlReputations[url] = 'clean';
  });

  (indicators.domains || []).forEach((domain) => {
    if (domain.endsWith('.onion')) results.domainTypes[domain] = 'tor-hidden-service';
    else results.domainTypes[domain] = 'normal';
  });

  (indicators.hashes || []).forEach((hash) => {
    if (hash.startsWith('bad') || hash.startsWith('mal')) results.fileHashes[hash] = 'malicious';
    else results.fileHashes[hash] = 'unknown';
  });

  // Simulate async I/O
  await new Promise((r) => setTimeout(r, 10));
  return results;
}

module.exports = { enrichIndicators };
