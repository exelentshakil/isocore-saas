'use client';

import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Code2,
  FileJson,
  Database,
  Layers,
  Server,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DDL_BLUEPRINT = `-- ============================================================================
-- IsoCore Production PostgreSQL Multi-Tenant Architecture Blueprint
-- Strategy A: Shared DB + Row-Level Security (RLS) via Session Context
-- ============================================================================

-- 1. Tenants Directory
CREATE TABLE tenants (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  tier VARCHAR(32) NOT NULL DEFAULT 'Enterprise',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Isolated Ledger Transactions Table
CREATE TABLE transactions (
  id VARCHAR(64) PRIMARY KEY DEFAULT 'tx_' || replace(gen_random_uuid()::text, '-', ''),
  tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  reference_id VARCHAR(128) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  amount NUMERIC(14, 2) NOT NULL CHECK (amount >= 0),
  platform_fee NUMERIC(14, 2) NOT NULL,
  net_settled NUMERIC(14, 2) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'PROCESSING',
  risk_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Composite Tenant B-Tree Indexes
CREATE INDEX idx_transactions_tenant_date ON transactions (tenant_id, created_at DESC);

-- 4. Enable & Force Row-Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions FORCE ROW LEVEL SECURITY;

-- 5. Zero-Leakage Restrictive Security Policy
CREATE POLICY tenant_isolation_policy ON transactions
  AS RESTRICTIVE
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id', true))
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true));

-- 6. Connection Pool Hook (Run before any tenant query):
-- SET LOCAL app.current_tenant_id = 'ten_acme_892';`;

const COMPOSE_BLUEPRINT = {
  version: '3.8',
  services: {
    postgres: {
      image: 'postgres:16-alpine',
      environment: {
        POSTGRES_DB: 'isocore_saas',
        POSTGRES_USER: 'isocore_admin',
        POSTGRES_PASSWORD_FILE: '/run/secrets/pg_password',
      },
      ports: ['5432:5432'],
      volumes: ['pgdata:/var/lib/postgresql/data'],
      command: ['postgres', '-c', 'shared_preload_libraries=pgcrypto'],
    },
    pgbouncer: {
      image: 'edoburu/pgbouncer:latest',
      environment: {
        DB_HOST: 'postgres',
        DB_PORT: '5432',
        DB_NAME: 'isocore_saas',
        POOL_MODE: 'transaction',
        MAX_CLIENT_CONN: '500',
        DEFAULT_POOL_SIZE: '50',
        SERVER_RESET_QUERY: 'DISCARD ALL',
      },
      ports: ['6432:6432'],
      depends_on: ['postgres'],
    },
    api: {
      build: { context: '.', dockerfile: 'Dockerfile' },
      environment: {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://isocore_app:secret@pgbouncer:6432/isocore_saas',
        INLINE_LLM_FIREWALL: 'enabled',
      },
      ports: ['3000:3000'],
      depends_on: ['pgbouncer'],
    },
  },
  volumes: {
    pgdata: { driver: 'local' },
  },
};

export function BlueprintExporter() {
  const [selectedFormat, setSelectedFormat] = useState<'sql' | 'docker'>('sql');
  const [copied, setCopied] = useState(false);

  const activeContent =
    selectedFormat === 'sql'
      ? DDL_BLUEPRINT
      : JSON.stringify(COMPOSE_BLUEPRINT, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], {
      type: selectedFormat === 'sql' ? 'text/plain' : 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =
      selectedFormat === 'sql'
        ? 'isocore-postgres-rls-blueprint.sql'
        : 'isocore-docker-stack.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand-subtle)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-brand)] border border-[var(--color-brand)]/20 whitespace-nowrap shrink-0">
              <FileJson className="h-3.5 w-3.5" />
              Turnkey Production Blueprints
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              PostgreSQL Schema & Infrastructure Stack
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            One-Click Architecture Blueprints (SQL DDL & Docker Stack)
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Export ready-to-run PostgreSQL DDL schemas with RLS policies, connection pool configurations, and containerized Docker Compose services.
          </p>
        </div>

        {/* Format Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-0.5 text-xs font-medium">
            <button
              onClick={() => setSelectedFormat('sql')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                selectedFormat === 'sql'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              PostgreSQL DDL (.sql)
            </button>
            <button
              onClick={() => setSelectedFormat('docker')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                selectedFormat === 'docker'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Docker Stack (.json)
            </button>
          </div>
        </div>
      </div>

      {/* Code Display & Download Controls */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] overflow-hidden">
        {/* Sub-bar */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-[var(--color-brand)]" />
            <span className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
              {selectedFormat === 'sql'
                ? 'isocore-postgres-rls-blueprint.sql'
                : 'isocore-docker-stack.json'}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              (PostgreSQL 16 Enterprise • RLS Enabled)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="h-7 text-xs border-[var(--color-border)] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1 text-[var(--color-status-green)]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  <span>Copy Blueprint</span>
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className="h-7 text-xs bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-3 w-3 mr-1" />
              <span>Download {selectedFormat.toUpperCase()}</span>
            </Button>
          </div>
        </div>

        {/* Code Body */}
        <div className="p-4 max-h-64 overflow-y-auto font-mono text-xs text-[var(--color-text-secondary)] leading-relaxed bg-[#0a0e1a] text-slate-200">
          <pre>{activeContent}</pre>
        </div>
      </div>

      {/* 3-Step Implementation Instructions */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)] mb-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-brand-subtle)] text-[var(--color-brand)] font-mono text-xs">
              1
            </span>
            <span>Execute DDL Schema</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Run the SQL blueprint on your AWS Aurora, Supabase, or RDS instance to establish tables, indexes, and FORCE RLS policies.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)] mb-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-brand-subtle)] text-[var(--color-brand)] font-mono text-xs">
              2
            </span>
            <span>Configure PgBouncer Pooling</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Set pool mode to <code className="text-[11px] font-mono">transaction</code> and ensure <code className="text-[11px] font-mono">DISCARD ALL</code> clears session parameters on checkout.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)] mb-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-brand-subtle)] text-[var(--color-brand)] font-mono text-xs">
              3
            </span>
            <span>Deploy Next.js / Node.js</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Connect your application container. Session middleware injects <code className="text-[11px] font-mono">SET LOCAL app.current_tenant_id</code> per incoming HTTP request.
          </p>
        </div>
      </div>
    </div>
  );
}
