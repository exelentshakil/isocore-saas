'use client';

import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2,
  Server,
} from 'lucide-react';

export function RoiCostCalculator() {
  const [tenantCount, setTenantCount] = useState<number>(50);
  const [avgTransactionsPerTenant, setAvgTransactionsPerTenant] = useState<number>(2500);
  const [avgTicketSize, setAvgTicketSize] = useState<number>(180);
  const [selectedStrategy, setSelectedStrategy] = useState<'strategyA' | 'strategyB' | 'strategyC'>('strategyA');

  const totalMonthlyTransactions = tenantCount * avgTransactionsPerTenant;
  const grossVolume = totalMonthlyTransactions * avgTicketSize;

  // Platform take-rate: 2.4% + $0.30 per tx
  const platformRevenue = grossVolume * 0.024 + totalMonthlyTransactions * 0.30;

  // Cloud Infrastructure Costs by Strategy:
  // Strategy A: Shared DB + RLS (1 AWS Aurora Serverless cluster + PgBouncer)
  // Strategy B: Schema-per-tenant (Higher connection pool & migration overhead)
  // Strategy C: DB-per-tenant (Dedicated DB instance per customer - huge idle cost)
  const infraCosts = {
    strategyA: 180 + Math.min(600, tenantCount * 3.2), // Base Aurora + ACU scaling
    strategyB: 320 + Math.min(1200, tenantCount * 8.5), // Schema connection footprint
    strategyC: tenantCount * 65.0, // $65/mo minimum per isolated RDS instance
  };

  const currentInfraCost = +(infraCosts[selectedStrategy]).toFixed(2);
  const strategyASavingOverC = +(infraCosts.strategyC - infraCosts.strategyA).toFixed(2);
  const netOperatingMargin = +(platformRevenue - currentInfraCost).toFixed(2);
  const marginPercentage = ((netOperatingMargin / platformRevenue) * 100).toFixed(1);

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand-subtle)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-brand)] border border-[var(--color-brand)]/20 whitespace-nowrap shrink-0">
              <Calculator className="h-3.5 w-3.5" />
              Multi-Tenancy Unit Economics
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              PostgreSQL Architecture ROI & Margin Modeler
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Cloud Infrastructure Cost & Take-Rate Margin Engine
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Compare infrastructure burn across Shared DB + RLS vs Schema-per-Tenant vs DB-per-Tenant at enterprise scale.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-[var(--color-text-muted)] font-mono block">
            Net Monthly Margin
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[var(--color-status-green)] font-mono">
            ${netOperatingMargin.toLocaleString()} ({marginPercentage}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
            SaaS Scale Parameters
          </h4>

          {/* Architecture Strategy Selection */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-primary)] block mb-1.5">
              PostgreSQL Multi-Tenancy Strategy:
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
              <button
                onClick={() => setSelectedStrategy('strategyA')}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                  selectedStrategy === 'strategyA'
                    ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)] text-[var(--color-brand)] font-bold'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                }`}
              >
                Strategy A (RLS)
              </button>
              <button
                onClick={() => setSelectedStrategy('strategyB')}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                  selectedStrategy === 'strategyB'
                    ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)] text-[var(--color-brand)] font-bold'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                }`}
              >
                Strategy B (Schema)
              </button>
              <button
                onClick={() => setSelectedStrategy('strategyC')}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                  selectedStrategy === 'strategyC'
                    ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)] text-[var(--color-brand)] font-bold'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                }`}
              >
                Strategy C (VIP DB)
              </button>
            </div>
          </div>

          {/* Tenant Count Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium text-[var(--color-text-primary)]">
                Active Onboarded Tenants:
              </span>
              <span className="font-mono font-bold text-[var(--color-brand)]">
                {tenantCount} Companies
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={200}
              step={5}
              value={tenantCount}
              onChange={(e) => setTenantCount(Number(e.target.value))}
              className="w-full accent-[var(--color-brand)] cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Monthly Transactions Per Tenant */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium text-[var(--color-text-primary)]">
                Avg Transactions / Tenant / Mo:
              </span>
              <span className="font-mono font-bold text-[var(--color-brand)]">
                {avgTransactionsPerTenant.toLocaleString()} tx/mo
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={15000}
              step={500}
              value={avgTransactionsPerTenant}
              onChange={(e) => setAvgTransactionsPerTenant(Number(e.target.value))}
              className="w-full accent-[var(--color-brand)] cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <span className="text-[11px] text-[var(--color-text-muted)] font-mono block mt-0.5">
              Total platform volume: {totalMonthlyTransactions.toLocaleString()} transactions/mo
            </span>
          </div>

          {/* Avg Ticket Size */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium text-[var(--color-text-primary)]">
                Avg Invoice / Ticket Value:
              </span>
              <span className="font-mono font-bold text-[var(--color-status-green)]">
                ${avgTicketSize} USD
              </span>
            </div>
            <input
              type="range"
              min={25}
              max={1000}
              step={25}
              value={avgTicketSize}
              onChange={(e) => setAvgTicketSize(Number(e.target.value))}
              className="w-full accent-[var(--color-status-green)] cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Cost Matrix & Margin Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Infrastructure Cost Line Items */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-2">
              Itemized Infrastructure Cost Comparison
            </h4>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-1.5">
                <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                  <Database className="h-3.5 w-3.5 text-[var(--color-brand)]" />
                  Strategy A: Shared DB + RLS (Aurora Serverless + PgBouncer)
                </span>
                <span className="font-bold text-[var(--color-status-green)]">
                  ${infraCosts.strategyA.toFixed(2)} / mo
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-1.5">
                <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                  <Layers className="h-3.5 w-3.5 text-blue-500" />
                  Strategy B: Schema-per-Tenant ({tenantCount} Schemas)
                </span>
                <span className="font-bold text-[var(--color-text-secondary)]">
                  ${infraCosts.strategyB.toFixed(2)} / mo
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-1.5">
                <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                  <Server className="h-3.5 w-3.5 text-rose-500" />
                  Strategy C: Dedicated DB per Tenant ({tenantCount} RDS Instances)
                </span>
                <span className="font-bold text-rose-500">
                  ${infraCosts.strategyC.toFixed(2)} / mo
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                  <Cpu className="h-3.5 w-3.5 text-[var(--color-brand)]" />
                  Dual AI Copilot Token Burn (~{tenantCount * 40} Monthly Scans)
                </span>
                <span className="font-bold text-[var(--color-brand)]">
                  ${(tenantCount * 0.18).toFixed(2)} / mo
                </span>
              </div>
            </div>
          </div>

          {/* Strategic Advantage Highlight */}
          <div className="rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand-subtle)]/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-[var(--color-brand)]" />
                Strategy A (Shared DB + RLS) Cost Advantage
              </span>
              <span className="text-xs font-mono font-bold text-[var(--color-status-green)]">
                Saves ${strategyASavingOverC.toLocaleString()} / mo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5">
                <span className="text-xs text-[var(--color-text-muted)] font-mono block">
                  Gross Platform Take (2.4%+$0.30)
                </span>
                <span className="text-lg font-bold text-[var(--color-text-primary)] font-mono">
                  ${platformRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })} / mo
                </span>
              </div>

              <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5">
                <span className="text-xs text-[var(--color-text-muted)] font-mono block">
                  Annual Architecture Savings
                </span>
                <span className="text-lg font-bold text-[var(--color-status-green)] font-mono">
                  +${(strategyASavingOverC * 12).toLocaleString()} / yr
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)] mt-2.5 leading-relaxed font-sans">
              💡 <strong>Architectural Recommendation:</strong> Deploy Strategy A (Shared DB + RLS) for 95% of standard and enterprise customers to minimize database migration friction and idle connection pool costs, while offering Strategy C as a premium VIP add-on for regulated enterprise tiers requiring dedicated physical storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
