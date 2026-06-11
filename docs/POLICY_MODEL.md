# AI Sentry — Policy Model

AI Sentry uses a deterministic, capability‑based policy model to validate every agent action.  
This document defines the semantics, evaluation order, and enforcement guarantees of the policy engine.

---

## 1. Policy Structure

AI Sentry policies are defined in YAML and contain three major sections:

### **1. capabilities**
Defines what actions an agent is allowed to perform.

### **2. constraints**
Defines additional rules such as:
- identity requirements  
- TTL  
- context restrictions  
- intent validation  

### **3. audit**
Defines what events must be logged.

---

## 2. Capability Semantics

A capability is a signed permission object containing:

- **action** — what the agent may do  
- **target** — what the action applies to  
- **intent** — why the action is being performed  
- **identity** — who the capability belongs to  
- **ttl** — expiration time  
- **nonce** — prevents replay attacks  

Capabilities are **immutable** and **identity‑bound**.

---

## 3. Policy Evaluation Flow

AI Sentry evaluates every action using the following deterministic sequence:

### **Step 1 — Capability Lookup**
Find a capability matching the requested action.

### **Step 2 — Identity Check**
Verify the capability belongs to the requesting agent.

### **Step 3 — TTL Check**
Reject if expired.

### **Step 4 — Intent Validation**
Ensure the action aligns with the original declared intent.

### **Step 5 — Constraint Evaluation**
Apply additional policy rules:
- context  
- environment  
- resource limits  
- safety constraints  

### **Step 6 — Decision**
Allow or deny the action.

---

## 4. Denial Model

AI Sentry uses a **fail‑closed** model:

- If any check fails → **deny**  
- If any field is missing → **deny**  
- If policy is malformed → **deny**  
- If capability is ambiguous → **deny**  

This ensures safety even under partial system failure.

---

## 5. Error Categories

AI Sentry classifies errors into:

### **1. CapabilityError**
Missing, invalid, or expired capability.

### **2. IdentityError**
Agent identity mismatch.

### **3. IntentError**
Action does not match declared intent.

### **4. ConstraintError**
Policy constraints not satisfied.

### **5. SystemError**
Internal or configuration failure.

---

## 6. Audit Model

AI Sentry logs:

- capability issuance  
- capability usage  
- denials  
- revocations  
- drift detection events  

Audit logs are **append‑only** and cannot be modified.

---

## 7. Summary

The AI Sentry policy model ensures:

- deterministic enforcement  
- strict least privilege  
- identity‑bound permissions  
- intent‑aware validation  
- safe failure behavior  
- full auditability  

This model provides a predictable and secure foundation for multi‑agent AI systems.
