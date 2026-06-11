#!/usr/bin/env bash
# tests/demo.sh
# Minimal demo script to show the threatintel + policy engine interaction.

node -e "(async()=>{ const client=require('../threatintel/client'); const engine=require('../policy_engine'); const indicators={ urls:['http://example.com','http://phish.example.com','http://ads.example.com/ad-redirect'], domains:['safe.example','danger.onion'], hashes:['good123','bad456'] }; const enriched=await client.enrichIndicators(indicators); console.log('ENRICHED:', JSON.stringify(enriched,null,2)); const result=await engine.evaluate({indicators},enriched); console.log('DECISION:', JSON.stringify(result,null,2)); })()"
