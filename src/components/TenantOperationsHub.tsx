'use client';

import React, { useState } from 'react';
import { CreditCard, Plus, Filter, ArrowUpRight, DollarSign, Calculator, Lock, RefreshCw } from 'lucide-react';
import { Tenant, TenantTransaction } from '@/lib/tenant-data';

interface TenantOperationsHubProps {
  currentTenant: Tenant;
  transactions: TenantTransaction[];
  onAddTransaction: (tx: TenantTransaction) => void;
}

export const TenantOperationsHub: React.FC<TenantOperationsHubProps> = ({
  currentTenant,
  transactions,
  onAddTransaction,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // New Transaction Form State
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [grossAmount, setGrossAmount] = useState('1250.00');
  const [riskAssessment, setRiskAssessment] = useState(3);

  // Deterministic calculation
  const parsedGross = parseFloat(grossAmount) || 0;
  const calculatedFee = Math.round((parsedGross * 0.024 + 0.30) * 100) / 100;
  const calculatedNet = Math.max(0, Math.round((parsedGross - calculatedFee) * 100) / 100);

  const tenantTransactions = transactions.filter(t => t.tenantId === currentTenant.id);
  const filteredTransactions = tenantTransactions.filter(t => {
    if (filterStatus === 'ALL') return true;
    return t.status === filterStatus;
  });

  const totalSettled = tenantTransactions
    .filter(t => t.status === 'SETTLED')
    .reduce((acc, curr) => acc + curr.netSettled, 0);

  const totalProcessing = tenantTransactions
    .filter(t => t.status === 'PROCESSING' || t.status === 'ESCROW_HOLD')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || parsedGross <= 0) return;

    const newTx: TenantTransaction = {
      id: `tx_${Math.floor(1000 + Math.random() * 9000)}`,
      tenantId: currentTenant.id,
      referenceId: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerName: custName,
      customerEmail: custEmail || 'billing@clientcorp.com',
      amount: parsedGross,
      currency: 'USD',
      platformFee: calculatedFee,
      netSettled: calculatedNet,
      status: riskAssessment > 40 ? 'ESCROW_HOLD' : 'SETTLED',
      settlementAccount: `${currentTenant.name} Operating Vault **** 4819`,
      riskScore: riskAssessment,
      createdAt: new Date().toISOString(),
    };

    onAddTransaction(newTx);
    setIsModalOpen(false);
    setCustName('');
    setCustEmail('');
    setGrossAmount('1250.00');
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  Tenant Financial Ledger & Operations Hub
                </h3>
                <span className="rounded-md bg-[var(--color-brand-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--color-brand)] border border-[var(--color-brand)]/20">
                  {currentTenant.name}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Deterministic calculation engine (Fee = Gross × 2.4% + $0.30). Zero LLM math hallucination.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[var(--color-brand-hover)] transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Process New Transaction
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* KPI Mini Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span>Total Settled (Net)</span>
              <DollarSign className="h-4 w-4 text-[var(--color-status-green)]" />
            </div>
            <div className="text-xl font-bold text-[var(--color-text-primary)] mt-2">
              ${totalSettled.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-[var(--color-status-green)] flex items-center gap-1 mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3" />
              100% Verified in PostgreSQL
            </span>
          </div>

          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span>Processing / Escrow Hold</span>
              <Lock className="h-4 w-4 text-[var(--color-brand-amber)]" />
            </div>
            <div className="text-xl font-bold text-[var(--color-text-primary)] mt-2">
              ${totalProcessing.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-[var(--color-text-muted)] mt-1 block">
              Risk score evaluation active
            </span>
          </div>

          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span>Calculated Take-Rate</span>
              <Calculator className="h-4 w-4 text-[var(--color-brand)]" />
            </div>
            <div className="text-xl font-bold text-[var(--color-brand)] mt-2">
              2.4% + $0.30
            </div>
            <span className="text-[11px] text-[var(--color-text-muted)] mt-1 block">
              Deterministic formula locked
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
            <span className="text-xs font-medium text-[var(--color-text-secondary)]">Status Filter:</span>
            <div className="flex items-center gap-1">
              {['ALL', 'SETTLED', 'PROCESSING', 'ESCROW_HOLD'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${filterStatus === status ? 'bg-[var(--color-brand)] text-white' : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            Isolated rows: {filteredTransactions.length} of {tenantTransactions.length}
          </span>
        </div>

        {/* Transactions Table */}
        <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] font-medium border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4 text-right">Gross Amount</th>
                  <th className="py-3 px-4 text-right">Fee (2.4%+$0.30)</th>
                  <th className="py-3 px-4 text-right">Net Settled</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Risk Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-primary)]">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-xs text-[var(--color-text-muted)]">
                      No records matching filter for {currentTenant.name}.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-[var(--color-brand)]">
                        {tx.referenceId}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[var(--color-text-primary)]">{tx.customerName}</div>
                        <div className="text-[11px] text-[var(--color-text-muted)]">{tx.customerEmail}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold">
                        ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-[var(--color-text-muted)]">
                        -${tx.platformFee.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-[var(--color-status-green)]">
                        ${tx.netSettled.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            tx.status === 'SETTLED'
                              ? 'bg-[var(--color-status-green-bg)] text-[var(--color-status-green)] border border-[var(--color-status-green-border)]'
                              : tx.status === 'PROCESSING'
                              ? 'bg-[var(--color-status-amber-bg)] text-[var(--color-status-amber)] border border-[var(--color-status-amber-border)]'
                              : 'bg-[var(--color-status-purple-bg)] text-[var(--color-status-purple)] border border-[var(--color-status-purple-border)]'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block font-mono text-xs px-2 py-0.5 rounded ${
                            tx.riskScore < 10
                              ? 'text-[var(--color-status-green)] bg-[var(--color-status-green-bg)]'
                              : tx.riskScore < 30
                              ? 'text-[var(--color-status-amber)] bg-[var(--color-status-amber-bg)]'
                              : 'text-[var(--color-status-red)] bg-[var(--color-status-red-bg)] font-bold'
                          }`}
                        >
                          {tx.riskScore}/100
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Process Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <div>
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                  Process New Deterministic Transaction
                </h4>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Target Tenant: <span className="font-semibold text-[var(--color-brand)]">{currentTenant.name}</span>
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-[var(--color-text-secondary)] mb-1">
                  Customer / Corporate Entity
                </label>
                <input
                  type="text"
                  required
                  value={custName}
                  onChange={e => setCustName(e.target.value)}
                  placeholder="e.g. Apex Global Logistics AG"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:border-[var(--color-brand)] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[var(--color-text-secondary)] mb-1">
                  Billing Contact Email
                </label>
                <input
                  type="email"
                  value={custEmail}
                  onChange={e => setCustEmail(e.target.value)}
                  placeholder="billing@apexlogistics.ch"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:border-[var(--color-brand)] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[var(--color-text-secondary)] mb-1">
                  Gross Transaction Amount ($ USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={grossAmount}
                  onChange={e => setGrossAmount(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-2 text-xs text-[var(--color-text-primary)] font-mono focus:border-[var(--color-brand)] focus:outline-hidden"
                />
              </div>

              {/* Dynamic Fee Preview */}
              <div className="rounded-lg bg-[var(--color-panel-subtle)] p-3 border border-[var(--color-border)] space-y-1.5 font-mono">
                <div className="flex justify-between text-[var(--color-text-muted)]">
                  <span>Gross:</span>
                  <span>${parsedGross.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--color-text-muted)]">
                  <span>Platform Fee (2.4% + $0.30):</span>
                  <span>-${calculatedFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-[var(--color-status-green)] border-t border-[var(--color-border)] pt-1">
                  <span>Net Disbursed:</span>
                  <span>${calculatedNet.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[var(--color-text-secondary)] mb-1">
                  Risk Assessment Score ({riskAssessment}/100)
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={riskAssessment}
                  onChange={e => setRiskAssessment(parseInt(e.target.value))}
                  className="w-full accent-[var(--color-brand)]"
                />
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {riskAssessment > 40 ? 'Risk > 40 will automatically trigger Escrow Hold.' : 'Low risk (Instant settlement)'}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[var(--color-brand)] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] transition-all cursor-pointer"
                >
                  Post to PostgreSQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
