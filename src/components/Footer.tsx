'use client';

import React from 'react';
import {
  ShieldCheck,
  Database,
  Award,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Systems Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-black text-sm shadow-xs">
                IC
              </div>
              <span className="text-base font-extrabold tracking-tight text-[var(--color-text-primary)]">
                IsoCore SaaS
              </span>
              <span className="rounded-full bg-[var(--color-brand-subtle)] px-2 py-0.5 text-xs font-mono font-bold text-[var(--color-brand)] border border-[var(--color-brand)]/20">
                PostgreSQL Multi-Tenant Engine
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-md">
              Enterprise multi-tenant reference architecture providing complete data, user, customer, transaction, and operational isolation across independent companies via PostgreSQL 16 Row-Level Security (RLS) and transaction session context.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[var(--color-status-green)] animate-pulse"></span>
                RLS Kernel Isolation: 100% Active
              </span>
              <span>•</span>
              <span>NIST AI RMF 100-1 Governed</span>
              <span>•</span>
              <span>Zero Cross-Tenant Leakage</span>
            </div>
          </div>

          {/* Architecture Pillars */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Systems Architecture
            </h4>
            <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)] font-sans">
              <li>Next.js 15.5+ App Router & TypeScript</li>
              <li>PostgreSQL 16 RLS (<code className="font-mono text-[11px]">current_setting</code>)</li>
              <li>Pre-Commit HMAC-SHA256 Audit Triggers</li>
              <li>Granular Role-Based Access Control (RBAC)</li>
              <li>Deterministic Financial Ledger (2.4% + $0.30)</li>
              <li>Dual-Provider AI Copilot (OpenAI + Gemini)</li>
            </ul>
          </div>

          {/* Systems Architect Verification */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Principal Systems Architect
            </h4>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
                <Award className="h-4 w-4 text-[var(--color-brand)]" />
                <span>Verified Upwork Partner</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                12+ Years Enterprise Systems Engineering. Former Lead Systems Engineer at Legiit ($1M ARR Command Center).
              </p>
              <div className="pt-1 border-t border-[var(--color-border)] text-xs font-mono text-[var(--color-brand)]">
                Securiti Certified AI Architect (NIST AI RMF)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] font-mono gap-3">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} IsoCore SaaS Engine. Production Architecture Reference.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#briefing" className="hover:text-[var(--color-text-primary)] transition-colors">
              Briefing
            </a>
            <a href="#postgres-rls" className="hover:text-[var(--color-text-primary)] transition-colors">
              PostgreSQL RLS
            </a>
            <a href="#operations" className="hover:text-[var(--color-text-primary)] transition-colors">
              Ledger
            </a>
            <a href="#rbac" className="hover:text-[var(--color-text-primary)] transition-colors">
              RBAC Matrix
            </a>
            <a href="#audit-log" className="hover:text-[var(--color-text-primary)] transition-colors">
              Audit Trail
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
