# AI Sentry — Runtime Model

AI Sentry enforces capability‑based security at runtime.  
This document defines how sessions, capabilities, validation, revocation, and auditing behave during execution.

---

## 1. Runtime Components

AI Sentry’s runtime consists of four active components:

### **1. Session Store**
Tracks:
- active sessions  
- issued capabilities  
- identity context  
- TTL and revocation state  

### **2. Capability Engine**
Validates:
- identity  
- TTL  
- intent  
- constraints  
- action‑target match  

### **3. Revocation Engine**
Handles:
- manual revocation  
- automatic TTL expiration  
- drift‑triggered revocation  

### **4. Audit Logger**
Records:
- capability issuance  
- capability usage  
- denials  
- revocations  
- drift events  

---

## 2. Session Lifecycle

A session progresses through five phases:

### **1. Create**
Agent identity is established.

### **2. Issue**
Capabilities are granted based on policy.

### **3. Use**
Agent performs actions validated by Sentry.

### **4. Drift Check**
Sentry monitors intent consistency.

### **5. Terminate**
Session ends or is revoked.

---

## 3. Capability Lifecycle

Capabilities follow a strict lifecycle:

### **1. Issued**
Created with identity, intent, TTL, and nonce.

### **2. Active**
Valid for use until TTL expires.

### **3. Expired**
Automatically invalid after TTL.

### **4. Revoked**
Manually or automatically invalidated.

### **5. Audited**
All usage is logged.

Capabilities are **immutable** and **identity‑bound** at all times.

---

## 4. Action Validation Pipeline

Every agent action goes through a deterministic pipeline:

### **Step 1 — Capability Match**
Find capability matching action + target.

### **Step 2 — Identity Check**
Reject if identity mismatch.

### **Step 3 — TTL Check**
Reject if expired.

### **Step 4 — Intent Validation**
Ensure action aligns with declared intent.

### **Step 5 — Constraint Evaluation**
Apply policy constraints:
- environment  
- context  
- resource limits  
- safety rules  

### **Step 6 — Decision**
Allow or deny.

This pipeline is **fail‑closed**.

---

## 5. Revocation Model

AI Sentry supports three revocation modes:

### **1. Manual Revocation**
Administrator or system revokes capability.

### **2. TTL Expiration**
Automatic revocation when time runs out.

### **3. Drift‑Triggered Revocation**
If agent behavior deviates from declared intent.

Revocation is immediate and global.

---

## 6. Audit Events

AI Sentry emits audit events for:

- session start  
- capability issuance  
- capability usage  
- denials  
- revocations  
- drift detection  
- session termination  

Audit logs are **append‑only**.

---

## 7. Runtime Guarantees

AI Sentry runtime provides:

- deterministic validation  
- strict least privilege  
- identity‑bound permissions  
- intent‑aware enforcement  
- safe failure behavior  
- full auditability  
- predictable revocation  

These guarantees ensure secure execution even in adversarial or partially compromised environments.
