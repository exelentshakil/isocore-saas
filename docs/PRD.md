# Product Requirement Document (PRD): IsoCore Multi-Tenant SaaS Prototype

## Executive Summary
**IsoCore SaaS** is an enterprise-grade multi-tenant software architecture engineered to provide complete logical, operational, and data isolation across independent companies sharing a single high-throughput cloud infrastructure. Designed specifically for SaaS founders and enterprise operators, IsoCore eliminates cross-tenant data leakage risks, provides deterministic financial transaction processing, enforces granular Role-Based Access Control (RBAC), and establishes immutable, cryptographically verifiable audit trails.

---

## 1. Problem Statement & Core Principles
### The Multi-Tenancy Challenge
Traditional multi-tenant SaaS applications often rely on application-level filtering (`WHERE tenant_id = ?`). This pattern introduces significant operational risk: a single omitted `WHERE` clause in a complex JOIN, ORM query, or reporting script exposes confidential enterprise data across corporate boundaries.

### Core Architectural Principles
1. **Kernel-Level Enforcement (PostgreSQL Row-Level Security)**: Multi-tenancy isolation is enforced at the database engine level via PostgreSQL 16 RLS policies bound to transaction session variables (`SET LOCAL app.current_tenant_id = '...'`). Queries without session context return zero rows by default.
2. **Deterministic Business Logic**: Financial calculations, platform take-rates, and escrow locks are executed via pure, deterministic formulas (e.g. `Fee = ROUND(Gross * 0.024 + 0.30, 2)`). LLMs are never permitted to calculate ledger balances.
3. **Immutable Cryptographic Auditability**: Every state mutation triggers a PostgreSQL PL/pgSQL pre-commit trigger computing an HMAC-SHA256 digest of the new record state. Audit logs cannot be modified or truncated without invalidating the cryptographic chain.
4. **Governed Autonomous Intelligence**: Dual-provider AI copilot (OpenAI gpt-4o-mini primary with Google Gemini 2.0 Flash fallback) operates behind a Securiti-certified inline LLM firewall (NIST AI RMF 100-1 / OWASP Top 10 for LLMs) with mandatory tenant boundary injection.

---

## 2. Multi-Tenant Database Architecture
### Strategy Matrix
| Strategy | Implementation | Isolation Level | Migration Velocity | Cost Profile | Best For |
|---|---|---|---|---|---|
| **Strategy A (Primary)** | Shared DB + Shared Schema + Row-Level Security (RLS) | Logical (Database Kernel) | 1x Migration across all tenants | Lowest ($) | 95% of Standard & Enterprise Customers |
| **Strategy B** | Schema-per-Tenant (`search_path = tenant_xxx, public`) | Namespace Partitioning | Nx Migrations per tenant | Moderate ($$) | Regulated Mid-Market |
| **Strategy C** | Dedicated Aurora Database / Table Partitioning | Physical Data Boundary | Custom per VIP | Highest ($$$) | Healthcare (HIPAA), Banking (BaFin / SEC) |

### PostgreSQL 16 DDL & Policy Specification
```sql
-- Transactions table with forced RLS
CREATE TABLE transactions (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
  reference_id VARCHAR(128) NOT NULL,
  amount NUMERIC(14, 2) NOT NULL CHECK (amount >= 0),
  platform_fee NUMERIC(14, 2) NOT NULL,
  net_settled NUMERIC(14, 2) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'PROCESSING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_transactions_tenant_date ON transactions (tenant_id, created_at DESC);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON transactions
  AS RESTRICTIVE
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id', true))
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true));
```

---

## 3. Granular Role-Based Access Control (RBAC)
IsoCore defines 5 distinct enterprise roles mapped to 10 granular capabilities:
1. **SuperAdmin**: Cross-tenant context switching, global infrastructure telemetry, emergency killswitches.
2. **OrgAdmin**: Tenant settings management, team member invites, API key rotation, webhook configurations.
3. **FinanceManager**: Financial ledger inspection, transaction initiation, disbursement batches, payout reconciliation.
4. **OperationsLead**: Day-to-day workflow execution, customer record management, anomaly triage.
5. **ComplianceAuditor**: Read-only immutable audit trail access, signed SOC2 / HIPAA compliance bundle export.

---

## 4. Phase Rollout & Implementation Roadmap
- **Phase 0: Architecture & Discovery (Weeks 1–2)**:
  - Technical discovery sessions, PostgreSQL schema entity-relationship diagram (ERD), RLS policy design, connection pool sizing.
  - Deliverable: Approved Database DDL, OpenAPI 3.1 REST API specification, security threat model.
- **Phase 1: Backend Core & Multi-Tenant Middleware (Weeks 3–5)**:
  - Node.js (Fastify/Next.js) or Python (FastAPI) REST API services with connection pool hooks (`SET LOCAL app.current_tenant_id`).
  - Authentication (JWT with tenant claims), RBAC middleware guards, PostgreSQL migration runners.
- **Phase 2: Operations Cockpit & Financial Ledger (Weeks 6–8)**:
  - High-density React/Next.js frontend, deterministic ledger calculation engine, transaction status state machine.
- **Phase 3: Cryptographic Audit & AI Copilot Integration (Weeks 9–10)**:
  - SHA-256 pre-commit triggers, SOC2 export utilities, dual-provider AI copilot with Securiti inline firewall.
- **Phase 4: Production Hardening & Cloud Deployment (Weeks 11–12)**:
  - AWS Aurora Serverless v2 / Supabase setup, PgBouncer transaction pooling, Vercel edge deployment, automated CI/CD.
