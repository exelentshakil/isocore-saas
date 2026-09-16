'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Database,
  CreditCard,
  Shield,
  Bot,
  ShieldCheck,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewerTourProps {
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
}

export function ReviewerTour({ onNavigate, onOpenChaosModal }: ReviewerTourProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const evaluationPaths = [
    {
      id: 'postgres-rls',
      badge: 'Proof 1 • Database Kernel',
      title: 'PostgreSQL Isolation Engine',
      desc: 'Interactive simulation proving zero cross-tenant data leakage via PostgreSQL Row-Level Security and transaction session context.',
      actionLabel: 'Test RLS Isolation',
      icon: Database,
    },
    {
      id: 'operations',
      badge: 'Proof 2 • Deterministic Ledger',
      title: 'Operations & Take-Rate Hub',
      desc: 'Deterministic math engine (Platform Fee = Gross × 2.4% + $0.30). Zero LLM calculation hallucination. Live transaction mutation.',
      actionLabel: 'Inspect Ledger',
      icon: CreditCard,
    },
    {
      id: 'rbac',
      badge: 'Proof 3 • Access Control',
      title: 'Granular RBAC Matrix',
      desc: '5 distinct roles across 10 fine-grained capabilities. Live policy evaluator testing 200 OK vs 403 Forbidden access decisions.',
      actionLabel: 'Evaluate RBAC',
      icon: Shield,
    },
    {
      id: 'ai-copilot',
      badge: 'Proof 4 • Autonomous AI',
      title: 'Tenant AI Copilot & Audit',
      desc: 'Dual-provider AI intelligence bounded strictly within company context. Securiti-certified inline LLM firewall and SHA-256 audit trail.',
      actionLabel: 'Test AI Copilot',
      icon: Bot,
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs transition-all">
      {/* Top Banner Header with Problem-Solution Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand-subtle)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-brand)] border border-[var(--color-brand)]/20 whitespace-nowrap shrink-0">
              <Sparkles className="h-3.5 w-3.5" />
              Executive Architecture Evaluation Briefing
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Multi-Tenant SaaS Prototype Specification
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
            How to Evaluate This Multi-Tenant SaaS Prototype
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-4xl">
            A production-ready reference architecture delivering complete data, user, and operational isolation across independent enterprise companies, powered by PostgreSQL 16 Row-Level Security, granular RBAC, deterministic financial workflows, and Securiti-governed AI.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 text-xs border-[var(--color-border)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                Expand Briefing
              </>
            ) : (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-1" />
                Collapse Briefing
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Collapsible Evaluation Paths */}
      {!isCollapsed && (
        <div className="mt-4 space-y-4">
          {/* 4 Interactive Evaluation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {evaluationPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 transition-all hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-surface)] hover:shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center text-xs font-semibold text-[var(--color-brand)] bg-[var(--color-brand-subtle)] px-2 py-0.5 rounded border border-[var(--color-brand)]/20 whitespace-nowrap shrink-0">
                        {path.badge}
                      </span>
                      <Icon className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                      {path.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {path.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)]">
                    <button
                      onClick={() => onNavigate(path.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand)] hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{path.actionLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3-Layer Defense Summary Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl bg-[var(--color-brand-subtle)]/40 border border-[var(--color-brand)]/20 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-xs text-[var(--color-text-primary)]">
                <strong className="font-semibold text-[var(--color-brand)]">
                  Zero-Leakage Multi-Tenancy Architecture:
                </strong>{' '}
                1. PostgreSQL 16 RLS session policies (<code className="text-[11px] font-mono">SET LOCAL app.current_tenant_id</code>) ➔ 2. Deterministic ledger isolation ➔ 3. Pre-commit SHA-256 cryptographic audit trail.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChaosModal}
              className="h-7 text-xs border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Zap className="h-3 w-3 mr-1 text-amber-600 dark:text-amber-400" />
              <span>Simulate Breach Attempt</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
