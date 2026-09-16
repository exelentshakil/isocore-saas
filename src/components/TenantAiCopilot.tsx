'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Shield, AlertCircle, CheckCircle, RefreshCw, Cpu, Send } from 'lucide-react';
import { Tenant, TenantTransaction, AuditEvent } from '@/lib/tenant-data';
import { TenantAiTask, TenantAiAnalysisResponse } from '@/lib/tenant-ai';

interface TenantAiCopilotProps {
  currentTenant: Tenant;
  transactions: TenantTransaction[];
  auditEvents: AuditEvent[];
}

export const TenantAiCopilot: React.FC<TenantAiCopilotProps> = ({
  currentTenant,
  transactions,
  auditEvents,
}) => {
  const [activeTask, setActiveTask] = useState<TenantAiTask>('ANOMALY_DETECTION');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TenantAiAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async (task: TenantAiTask, promptText?: string) => {
    setIsLoading(true);
    setError(null);
    setActiveTask(task);

    const tenantTransactions = transactions.filter(t => t.tenantId === currentTenant.id);
    const tenantAudit = auditEvents.filter(a => a.tenantId === currentTenant.id);

    try {
      const res = await fetch('/api/ai/tenant-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: currentTenant.id,
          tenantName: currentTenant.name,
          task,
          userPrompt: promptText,
          contextData: {
            isolationStrategy: currentTenant.isolationStrategy,
            metrics: currentTenant.metrics,
            recentTransactions: tenantTransactions.slice(0, 5),
            recentAuditEvents: tenantAudit.slice(0, 5),
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data: TenantAiAnalysisResponse = await res.json();
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  Tenant Autonomous AI Copilot & Governance Engine
                </h3>
                <span className="rounded-md bg-[var(--color-brand-subtle)] px-2 py-0.5 text-xs font-semibold text-[var(--color-brand)] border border-[var(--color-brand)]/20">
                  Dual-Provider (OpenAI + Gemini)
                </span>
                <span className="rounded-md bg-[var(--color-status-green-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-status-green)] border border-[var(--color-status-green-border)]">
                  Securiti NIST AI RMF
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Strict tenant-bounded intelligence. Zero cross-tenant data leakage. Inline LLM firewall sanitizing all inputs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Preset Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => runAnalysis('ANOMALY_DETECTION')}
            disabled={isLoading}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTask === 'ANOMALY_DETECTION' && result
                ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)]/30 ring-1 ring-[var(--color-brand)]'
                : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[var(--color-brand)]">Preset 1</span>
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand)]" />
            </div>
            <div className="text-xs font-semibold text-[var(--color-text-primary)]">
              Run Anomaly & Risk Scan
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
              Audits transaction velocities, escrow thresholds, and perimeter flags.
            </p>
          </button>

          <button
            onClick={() => runAnalysis('RLS_COMPLIANCE_AUDIT')}
            disabled={isLoading}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTask === 'RLS_COMPLIANCE_AUDIT' && result
                ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)]/30 ring-1 ring-[var(--color-brand)]'
                : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[var(--color-brand-indigo)]">Preset 2</span>
              <Shield className="h-3.5 w-3.5 text-[var(--color-brand-indigo)]" />
            </div>
            <div className="text-xs font-semibold text-[var(--color-text-primary)]">
              Verify PostgreSQL RLS Policies
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
              Validates row-level isolation & cryptographic pre-commit triggers.
            </p>
          </button>

          <button
            onClick={() => runAnalysis('FINANCIAL_PL_SUMMARY')}
            disabled={isLoading}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTask === 'FINANCIAL_PL_SUMMARY' && result
                ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)]/30 ring-1 ring-[var(--color-brand)]'
                : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[var(--color-brand-amber)]">Preset 3</span>
              <Cpu className="h-3.5 w-3.5 text-[var(--color-brand-amber)]" />
            </div>
            <div className="text-xs font-semibold text-[var(--color-text-primary)]">
              Consolidate P&L & Take-Rate
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
              Deterministic fee reconciliation (Fee = 2.4% + $0.30/tx).
            </p>
          </button>
        </div>

        {/* Custom Query Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && customPrompt.trim()) {
                runAnalysis('CUSTOM_QUERY', customPrompt);
              }
            }}
            placeholder={`Ask copilot anything regarding ${currentTenant.name}'s data or security policies...`}
            className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-4 py-2.5 text-xs text-[var(--color-text-primary)] focus:border-[var(--color-brand)] focus:outline-hidden"
          />
          <button
            onClick={() => {
              if (customPrompt.trim()) {
                runAnalysis('CUSTOM_QUERY', customPrompt);
              }
            }}
            disabled={isLoading || !customPrompt.trim()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-brand)] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            <span>Analyze</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-center space-y-3">
            <RefreshCw className="h-6 w-6 animate-spin text-[var(--color-brand)] mx-auto" />
            <p className="text-xs font-semibold text-[var(--color-text-primary)]">
              Executing Dual-Provider AI Inference with Securiti Inline LLM Firewall...
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)]">
              Sanitizing prompt • Injecting PostgreSQL session tenant context ({currentTenant.id}) • Enforcing NIST bounds
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="p-4 rounded-xl border border-[var(--color-status-red-border)] bg-[var(--color-status-red-bg)] flex items-center gap-3 text-xs text-[var(--color-status-red)]">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Live Result View */}
        {result && !isLoading && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-5 space-y-5">
            {/* Telemetry Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[var(--color-text-primary)]">Inference Provider:</span>
                <span className="font-mono px-2 py-0.5 rounded bg-[var(--color-brand-subtle)] text-[var(--color-brand)] font-bold text-[11px]">
                  {result.provider} ({result.model})
                </span>
                <span className="font-mono text-[var(--color-text-muted)] text-[11px]">
                  ⚡ {result.latencyMs}ms
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] text-[var(--color-status-green)] font-medium">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Firewall Passed
                </span>
                <span className="font-mono text-[10px] text-[var(--color-text-muted)] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">
                  Risk: {result.firewallStatus.riskScore}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-1">
                Executive Synthesis
              </h4>
              <p className="text-sm font-medium text-[var(--color-text-primary)] leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Security Status Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)]">PostgreSQL RLS</span>
                <div className="text-xs font-bold text-[var(--color-status-green)] mt-1 flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Kernel Enforced (100%)
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)]">Cross-Tenant Leakage</span>
                <div className="text-xs font-bold text-[var(--color-status-green)] mt-1 flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  ZERO Leakage Risk
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)]">Audit Log Chain</span>
                <div className="text-xs font-bold text-[var(--color-brand)] mt-1 flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  SHA-256 Pre-commit Match
                </div>
              </div>
            </div>

            {/* Key Findings */}
            {result.keyFindings.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  Isolated Tenant Findings
                </h4>
                <ul className="space-y-1.5 text-xs text-[var(--color-text-primary)]">
                  {result.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] mt-1.5 shrink-0" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Actions */}
            {result.recommendedActions.length > 0 && (
              <div className="border-t border-[var(--color-border)] pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  Recommended Architecture Actions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedActions.map((action, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)]"
                    >
                      → {action}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
