'use client';

import React, { useState } from 'react';
import { Database, ShieldCheck, Lock, Terminal, CheckCircle2, AlertTriangle, Copy, Check, ArrowRight } from 'lucide-react';
import { Tenant } from '@/lib/tenant-data';

interface PostgresArchitectureConsoleProps {
  currentTenant: Tenant;
}

type SimulationMode = 'LEGIT_QUERY' | 'ADVERSARIAL_BREACH' | 'WRITE_ISOLATION' | 'AUDIT_TRIGGER';

export const PostgresArchitectureConsole: React.FC<PostgresArchitectureConsoleProps> = ({ currentTenant }) => {
  const [activeMode, setActiveMode] = useState<SimulationMode>('LEGIT_QUERY');
  const [copiedCode, setCopiedCode] = useState(false);

  const copyDdlToClipboard = () => {
    navigator.clipboard.writeText(PRODUCTION_DDL);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs overflow-hidden">
      {/* Header Banner */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  PostgreSQL Multi-Tenant Isolation Engine
                </h3>
                <span className="inline-flex items-center gap-1 rounded-md bg-[var(--color-status-green-bg)] px-2 py-0.5 text-xs font-semibold text-[var(--color-status-green)] border border-[var(--color-status-green-border)]">
                  <ShieldCheck className="h-3 w-3" />
                  RLS Active
                </span>
                <span className="inline-flex items-center rounded-md bg-[var(--color-brand-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--color-brand)] border border-[var(--color-brand)]/20">
                  {currentTenant.isolationStrategy}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Session-driven Row-Level Security (RLS) guaranteeing complete data containment at the database kernel.
              </p>
            </div>
          </div>

          <button
            onClick={copyDdlToClipboard}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors self-start sm:self-auto"
          >
            {copiedCode ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--color-status-green)]" />
                <span className="text-[var(--color-status-green)]">Copied Schema</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Production DDL</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Strategy Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border transition-all ${currentTenant.isolationStrategy === 'Shared DB + RLS' ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)]/30 ring-1 ring-[var(--color-brand)]' : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">Strategy A (Recommended)</span>
              {currentTenant.isolationStrategy === 'Shared DB + RLS' && (
                <span className="text-[10px] font-semibold bg-[var(--color-brand)] text-white px-1.5 py-0.5 rounded">Active Tenant</span>
              )}
            </div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Shared DB + Row-Level Security</h4>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Single database, shared tables. PostgreSQL evaluates session context via <code className="text-[11px] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded font-mono">current_setting(&apos;app.current_tenant_id&apos;)</code>.
            </p>
            <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
              <span>Cost: Lowest ($)</span>
              <span>Migrations: 1x</span>
              <span className="font-semibold text-[var(--color-status-green)]">Zero Leakage</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${currentTenant.isolationStrategy === 'Dedicated Schema' ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)]/30 ring-1 ring-[var(--color-brand)]' : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-indigo)]">Strategy B</span>
              {currentTenant.isolationStrategy === 'Dedicated Schema' && (
                <span className="text-[10px] font-semibold bg-[var(--color-brand)] text-white px-1.5 py-0.5 rounded">Active Tenant</span>
              )}
            </div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Schema-Per-Tenant</h4>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Isolated PostgreSQL schemas (<code className="text-[11px] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded font-mono">tenant_hrzn_410</code>). Connection pools switch dynamic <code className="text-[11px] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded font-mono">search_path</code> per request.
            </p>
            <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
              <span>Cost: Moderate ($$)</span>
              <span>Migrations: Nx</span>
              <span className="font-semibold text-[var(--color-brand)]">Physical Boundary</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${currentTenant.isolationStrategy === 'Isolated Partition' ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)]/30 ring-1 ring-[var(--color-brand)]' : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-amber)]">Strategy C</span>
              {currentTenant.isolationStrategy === 'Isolated Partition' && (
                <span className="text-[10px] font-semibold bg-[var(--color-brand)] text-white px-1.5 py-0.5 rounded">Active Tenant</span>
              )}
            </div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Isolated Table Partition / VIP DB</h4>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Declarative table partitioning by <code className="text-[11px] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded font-mono">LIST (tenant_id)</code> or dedicated Amazon Aurora instance for high-compliance VIPs.
            </p>
            <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
              <span>Cost: Highest ($$$)</span>
              <span>Migrations: Custom</span>
              <span className="font-semibold text-[var(--color-brand-amber)]">BaFin / HIPAA</span>
            </div>
          </div>
        </div>

        {/* Interactive SQL Isolation Proof Simulator */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[#0f172a] text-slate-100 overflow-hidden shadow-md">
          {/* Terminal Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-[#090d16] px-4 py-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-mono font-medium text-slate-300">
                PostgreSQL RLS Engine Simulator (v16.4 Enterprise)
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveMode('LEGIT_QUERY')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${activeMode === 'LEGIT_QUERY' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'}`}
              >
                1. Legitimate Query
              </button>
              <button
                onClick={() => setActiveMode('ADVERSARIAL_BREACH')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${activeMode === 'ADVERSARIAL_BREACH' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400 hover:text-slate-200'}`}
              >
                2. Adversarial Breach Attempt
              </button>
              <button
                onClick={() => setActiveMode('WRITE_ISOLATION')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${activeMode === 'WRITE_ISOLATION' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'}`}
              >
                3. Write Mutation Lock
              </button>
              <button
                onClick={() => setActiveMode('AUDIT_TRIGGER')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${activeMode === 'AUDIT_TRIGGER' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'}`}
              >
                4. SHA-256 Audit Trigger
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-5 font-mono text-xs space-y-4">
            {activeMode === 'LEGIT_QUERY' && (
              <>
                <div className="space-y-1 text-slate-300">
                  <div className="text-slate-500">-- 1. App server establishes connection & injects session context:</div>
                  <div className="text-emerald-400 font-semibold">BEGIN;</div>
                  <div className="text-emerald-300">
                    SET LOCAL app.current_tenant_id = &apos;{currentTenant.id}&apos;;
                  </div>
                  <div className="text-slate-500 mt-2">-- 2. Developer writes generic query without explicit WHERE tenant_id filter:</div>
                  <div className="text-cyan-300">
                    SELECT id, reference_id, amount, status FROM transactions ORDER BY created_at DESC;
                  </div>
                  <div className="text-emerald-400 font-semibold">COMMIT;</div>
                </div>

                <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      RLS Policy Applied: &quot;tenant_isolation_policy&quot;
                    </span>
                    <span>4 rows returned in 1.2ms</span>
                  </div>
                  <div className="overflow-x-auto text-[11px] text-slate-300">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-500 border-b border-slate-800">
                          <th className="pb-1 font-semibold">ID</th>
                          <th className="pb-1 font-semibold">REFERENCE</th>
                          <th className="pb-1 font-semibold">AMOUNT</th>
                          <th className="pb-1 font-semibold">TENANT_ID</th>
                          <th className="pb-1 font-semibold">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        <tr>
                          <td className="py-1 text-slate-400">tx_9841</td>
                          <td className="py-1 text-slate-200">INV-2026-901</td>
                          <td className="py-1 text-emerald-400">$14,250.00</td>
                          <td className="py-1 text-cyan-400">{currentTenant.id}</td>
                          <td className="py-1 text-slate-300">SETTLED</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-slate-400">tx_9842</td>
                          <td className="py-1 text-slate-200">INV-2026-902</td>
                          <td className="py-1 text-emerald-400">$8,640.50</td>
                          <td className="py-1 text-cyan-400">{currentTenant.id}</td>
                          <td className="py-1 text-slate-300">SETTLED</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-slate-400">tx_9843</td>
                          <td className="py-1 text-slate-200">INV-2026-903</td>
                          <td className="py-1 text-emerald-400">$32,400.00</td>
                          <td className="py-1 text-cyan-400">{currentTenant.id}</td>
                          <td className="py-1 text-amber-400">PROCESSING</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-slate-400">tx_9844</td>
                          <td className="py-1 text-slate-200">INV-2026-904</td>
                          <td className="py-1 text-emerald-400">$19,800.00</td>
                          <td className="py-1 text-cyan-400">{currentTenant.id}</td>
                          <td className="py-1 text-purple-400">ESCROW_HOLD</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeMode === 'ADVERSARIAL_BREACH' && (
              <>
                <div className="space-y-1 text-slate-300">
                  <div className="text-slate-500">-- Threat Model: Rogue script or compromised query attempts to read another tenant:</div>
                  <div className="text-emerald-400 font-semibold">BEGIN;</div>
                  <div className="text-slate-400">
                    SET LOCAL app.current_tenant_id = &apos;{currentTenant.id}&apos;;
                  </div>
                  <div className="text-rose-400 font-semibold mt-2">
                    SELECT * FROM transactions WHERE tenant_id = &apos;ten_hrzn_410&apos;; -- Horizon Health VIP
                  </div>
                  <div className="text-emerald-400 font-semibold">COMMIT;</div>
                </div>

                <div className="rounded-lg bg-rose-950/40 p-4 border border-rose-900/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-rose-300 border-b border-rose-900/40 pb-2">
                    <span className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="h-4 w-4 text-rose-400" />
                      RLS Kernel Evaluation: 0 ROWS RETURNED
                    </span>
                    <span className="text-rose-400 font-mono">Execution time: 0.8ms</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Even though the SQL query explicitly asked for <code className="bg-black/40 text-rose-300 px-1 py-0.5 rounded">ten_hrzn_410</code>, PostgreSQL evaluates:
                    <br />
                    <code className="text-emerald-300">tenant_id = current_setting(&apos;app.current_tenant_id&apos;, true)</code>
                    <br />
                    Since <code className="text-rose-300">&apos;ten_hrzn_410&apos; != &apos;{currentTenant.id}&apos;</code>, the query planner evaluates the row filter to <strong className="text-rose-400">FALSE</strong> before reading table blocks.
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Zero bytes transmitted over wire. Zero cross-tenant data leakage verified.</span>
                  </div>
                </div>
              </>
            )}

            {activeMode === 'WRITE_ISOLATION' && (
              <>
                <div className="space-y-1 text-slate-300">
                  <div className="text-slate-500">-- Threat Model: Attacker attempts to spoof tenant_id during record creation:</div>
                  <div className="text-emerald-400 font-semibold">BEGIN;</div>
                  <div className="text-slate-400">
                    SET LOCAL app.current_tenant_id = &apos;{currentTenant.id}&apos;;
                  </div>
                  <div className="text-amber-300 mt-2">
                    INSERT INTO transactions (id, tenant_id, reference_id, amount, status)
                    <br />
                    VALUES (&apos;tx_spoof_99&apos;, &apos;ten_hrzn_410&apos;, &apos;MAL-2026-001&apos;, 99999.00, &apos;SETTLED&apos;);
                  </div>
                </div>

                <div className="rounded-lg bg-amber-950/40 p-4 border border-amber-900/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-amber-300 border-b border-amber-900/40 pb-2">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Lock className="h-4 w-4 text-amber-400" />
                      PostgreSQL Exception: 42501 (insufficient_privilege)
                    </span>
                    <span className="text-rose-400 font-mono">ROLLBACK</span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    <span className="text-rose-400 font-bold">ERROR:</span> new row violates row-level security policy for table &quot;transactions&quot; (WITH CHECK OPTION).
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    The <code className="text-amber-300">WITH CHECK (tenant_id = current_setting(&apos;app.current_tenant_id&apos;, true))</code> clause guarantees that no application bug, injection, or misconfigured payload can insert records belonging to another company.
                  </p>
                </div>
              </>
            )}

            {activeMode === 'AUDIT_TRIGGER' && (
              <>
                <div className="space-y-1 text-slate-300">
                  <div className="text-slate-500">-- Cryptographic Audit Trigger calculates SHA-256 pre-commit digest:</div>
                  <div className="text-indigo-400">
                    CREATE OR REPLACE FUNCTION trg_audit_immutable_digest() RETURNS TRIGGER AS $$
                    <br />
                    BEGIN
                    <br />
                    &nbsp;&nbsp;NEW.sha256_digest := digest(row_to_json(NEW)::text || coalesce(NEW.tenant_id, &apos;&apos;), &apos;sha256&apos;);
                    <br />
                    &nbsp;&nbsp;INSERT INTO audit_log (tenant_id, action, resource, sha256_digest, timestamp)
                    <br />
                    &nbsp;&nbsp;VALUES (NEW.tenant_id, TG_OP, TG_TABLE_NAME || &apos;/&apos; || NEW.id, NEW.sha256_digest, now());
                    <br />
                    &nbsp;&nbsp;RETURN NEW;
                    <br />
                    END;
                    <br />
                    $$ LANGUAGE plpgsql SECURITY DEFINER;
                  </div>
                </div>

                <div className="rounded-lg bg-indigo-950/40 p-4 border border-indigo-900/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-indigo-300 border-b border-indigo-900/40 pb-2">
                    <span className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="h-4 w-4 text-indigo-400" />
                      Zero-Tamper Chain Created
                    </span>
                    <span className="text-emerald-400 font-mono">100% Cryptographic Match</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-300 bg-black/40 p-2.5 rounded border border-slate-800 break-all">
                    Latest SHA-256: <span className="text-indigo-300">7a9f81d8c6b2450efb78a9c334b2f15e8c1e8b23f87c9012d98a6b5c3e2f14aa</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Database pre-commit triggers ensure that neither developers nor DBAs can retroactively alter audit records without breaking the hash verification chain.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PRODUCTION_DDL = `-- ============================================================================
-- IsoCore Production PostgreSQL Multi-Tenant Schema with Row-Level Security
-- Architecture: Strategy A (Shared DB + RLS) with Transaction Session Variable
-- Author: Shakil Ahmed (BarakahSoft LLC)
-- ============================================================================

-- 1. Enable Cryptographic & UUID Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tenants Master Directory
CREATE TABLE tenants (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  tier VARCHAR(32) NOT NULL DEFAULT 'Growth B2B',
  isolation_strategy VARCHAR(32) NOT NULL DEFAULT 'Shared DB + RLS',
  compliance_tag VARCHAR(32) NOT NULL DEFAULT 'SOC2 Type II',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Core Transactions Ledger (Strictly Isolated by RLS)
CREATE TABLE transactions (
  id VARCHAR(64) PRIMARY KEY DEFAULT 'tx_' || replace(gen_random_uuid()::text, '-', ''),
  tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  reference_id VARCHAR(128) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  amount NUMERIC(14, 2) NOT NULL CHECK (amount >= 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  platform_fee NUMERIC(14, 2) NOT NULL,
  net_settled NUMERIC(14, 2) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'PROCESSING',
  risk_score INTEGER NOT NULL DEFAULT 0,
  sha256_digest VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Fast Lookups by Tenant + Date Index
CREATE INDEX idx_transactions_tenant_date ON transactions (tenant_id, created_at DESC);
CREATE INDEX idx_transactions_reference ON transactions (tenant_id, reference_id);

-- 5. MANDATORY: Enable & FORCE Row-Level Security
-- NOTE: 'FORCE' ensures table owner/superuser cannot accidentally bypass policies
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions FORCE ROW LEVEL SECURITY;

-- 6. Define Zero-Leakage Row-Level Security Policies
CREATE POLICY tenant_isolation_policy ON transactions
  AS RESTRICTIVE
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id', true))
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true));

-- 7. Immutable Cryptographic Audit Log
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL,
  actor VARCHAR(255) NOT NULL,
  actor_role VARCHAR(64) NOT NULL,
  action VARCHAR(64) NOT NULL,
  resource VARCHAR(255) NOT NULL,
  ip_address VARCHAR(64) NOT NULL,
  status VARCHAR(32) NOT NULL,
  sha256_digest VARCHAR(64) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log FORCE ROW LEVEL SECURITY;

CREATE POLICY audit_tenant_policy ON audit_log
  AS RESTRICTIVE
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id', true))
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true));

-- ============================================================================
-- Connection Pool Hook (Node.js / Python pg driver):
-- Run before executing any tenant query:
-- await client.query("SET LOCAL app.current_tenant_id = $1;", [sessionTenantId]);
-- ============================================================================`;
