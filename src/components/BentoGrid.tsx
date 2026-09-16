'use client';

import React from 'react';
import {
  Database,
  ShieldCheck,
  Clock,
  Lock,
  CheckCircle2,
  DollarSign,
  Cpu,
  Layers,
} from 'lucide-react';
import { Tenant } from '@/lib/tenant-data';

interface BentoGridProps {
  currentTenant: Tenant;
}

export function BentoGrid({ currentTenant }: BentoGridProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1: Active Tenant Isolation Status */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Multi-Tenant Architecture
            </span>
            <div className="flex items-center gap-1 rounded-full bg-[var(--color-brand-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--color-brand)] border border-[var(--color-brand)]/20 whitespace-nowrap shrink-0">
              <Database className="h-3 w-3" />
              <span>{currentTenant.isolationStrategy}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              {currentTenant.name}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono border-t border-[var(--color-border)] pt-2">
            <span>Pool Size: {currentTenant.dbConnectionConfig.poolSize} conns</span>
            <span>Region: {currentTenant.dbConnectionConfig.region.split(' ')[0]}</span>
          </div>
          <p className="text-[11px] text-[var(--color-brand)] mt-1 font-mono truncate">
            {currentTenant.dbConnectionConfig.sessionParam}
          </p>
        </div>

        {/* Card 2: Deterministic Monthly Volume */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Gross Monthly Ledger
            </span>
            <div className="flex items-center gap-1 rounded-full bg-[var(--color-status-green-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-status-green)] border border-[var(--color-status-green-border)] whitespace-nowrap shrink-0">
              <DollarSign className="h-3 w-3" />
              <span>{currentTenant.complianceTag}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              ${currentTenant.metrics.monthlyVolume.toLocaleString()}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              / mo volume
            </span>
          </div>

          <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
            <div className="w-[84%] bg-[var(--color-brand)]" title="Active Ledger Volume" />
            <div className="w-[16%] bg-[var(--color-status-green)]" title="Settlement Reserve" />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-text-muted)] font-mono">
            <span>Transactions: {currentTenant.metrics.transactionCount.toLocaleString()}</span>
            <span>Users: {currentTenant.metrics.activeUsers}</span>
          </div>
        </div>

        {/* Card 3: Dual-AI Copilot Latency */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Dual-AI Copilot Engine
            </span>
            <div className="flex items-center gap-1 rounded-full bg-[var(--color-brand-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--color-brand)] border border-[var(--color-brand)]/20 whitespace-nowrap shrink-0">
              <Cpu className="h-3 w-3" />
              <span>Sub-Second</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              342 ms
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              gpt-4o-mini avg
            </span>
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-secondary)] font-mono">OpenAI (Primary)</span>
              <span className="font-mono font-semibold text-[var(--color-brand)]">342ms</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-[35%] bg-[var(--color-brand)] rounded-full" />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[var(--color-text-secondary)] font-mono">Gemini 2.0 (Fallback)</span>
              <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">410ms</span>
            </div>
          </div>
        </div>

        {/* Card 4: Cryptographic SHA-256 Pre-Commit */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Cryptographic Audit Trail
            </span>
            <div className="flex items-center gap-1 rounded-full bg-[var(--color-status-green-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-status-green)] border border-[var(--color-status-green-border)] whitespace-nowrap shrink-0">
              <ShieldCheck className="h-3 w-3" />
              <span>Zero-Tamper</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              100% Verified
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              SHA-256 Digest
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-mono">
            <CheckCircle2 className="h-4 w-4 text-[var(--color-status-green)] shrink-0" />
            <span>PostgreSQL PL/pgSQL trigger computes digest pre-commit</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Audit logs cannot be updated or rolled back without hash invalidation
          </p>
        </div>

        {/* Card 5: Cross-Tenant Breach Containment */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Perimeter Containment
            </span>
            <div className="flex items-center gap-1 rounded-full bg-[var(--color-status-green-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-status-green)] border border-[var(--color-status-green-border)] whitespace-nowrap shrink-0">
              <Lock className="h-3 w-3" />
              <span>0 Vectors</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-status-green)]">
              0 Leaked Bytes
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-mono">
            <span>RLS Policy Enforcement:</span>
            <span className="font-semibold text-[var(--color-status-green)]">RESTRICTIVE</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
            <div className="h-full w-full bg-[var(--color-status-green)] rounded-full" />
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Queries without session context drop to 0 rows automatically
          </p>
        </div>

        {/* Card 6: Enterprise SLA & Availability */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Production Availability
            </span>
            <div className="flex items-center gap-1 rounded-full bg-[var(--color-status-green-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-status-green)] border border-[var(--color-status-green-border)] whitespace-nowrap shrink-0">
              <Clock className="h-3 w-3" />
              <span>SLA Target</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              {currentTenant.metrics.slaUptime}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Guaranteed Uptime
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-mono">
            <CheckCircle2 className="h-4 w-4 text-[var(--color-status-green)] shrink-0" />
            <span>Connection pool auto-heals & refreshes session variables</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Last audit health check: {currentTenant.metrics.lastAuditCheck}
          </p>
        </div>
      </div>
    </div>
  );
}
