'use client';

import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, UserCheck, KeyRound, Play } from 'lucide-react';
import { Tenant } from '@/lib/tenant-data';

interface RbacPermissionMatrixProps {
  currentTenant: Tenant;
}

type RoleType = 'SuperAdmin' | 'OrgAdmin' | 'FinanceManager' | 'OperationsLead' | 'ComplianceAuditor';

interface Capability {
  key: string;
  label: string;
  category: 'Administration' | 'Financial Ledger' | 'Security & Audit' | 'Autonomous AI';
  allowedRoles: RoleType[];
}

const CAPABILITIES: Capability[] = [
  { key: 'tenant:switch', label: 'Cross-Tenant Context Switch', category: 'Administration', allowedRoles: ['SuperAdmin'] },
  { key: 'tenant:update_settings', label: 'Update Tenant Webhooks & Settings', category: 'Administration', allowedRoles: ['SuperAdmin', 'OrgAdmin'] },
  { key: 'users:invite_manage', label: 'Invite & Manage Team Members', category: 'Administration', allowedRoles: ['SuperAdmin', 'OrgAdmin'] },
  { key: 'transactions:read', label: 'Read Transactions & Invoices', category: 'Financial Ledger', allowedRoles: ['SuperAdmin', 'OrgAdmin', 'FinanceManager', 'ComplianceAuditor'] },
  { key: 'transactions:create', label: 'Initiate New Ledger Transactions', category: 'Financial Ledger', allowedRoles: ['SuperAdmin', 'OrgAdmin', 'FinanceManager'] },
  { key: 'transactions:refund_settle', label: 'Disburse Payouts & Settlement Batches', category: 'Financial Ledger', allowedRoles: ['SuperAdmin', 'FinanceManager'] },
  { key: 'api_keys:rotate', label: 'Rotate Production API Keys & Secrets', category: 'Security & Audit', allowedRoles: ['SuperAdmin', 'OrgAdmin'] },
  { key: 'audit_log:view_raw', label: 'Inspect Immutable SHA-256 Audit Trail', category: 'Security & Audit', allowedRoles: ['SuperAdmin', 'OrgAdmin', 'ComplianceAuditor'] },
  { key: 'audit_log:export_signed', label: 'Export Signed Compliance Bundles (SOC2)', category: 'Security & Audit', allowedRoles: ['SuperAdmin', 'ComplianceAuditor'] },
  { key: 'ai_copilot:execute', label: 'Run Autonomous AI Copilot & Anomaly Scans', category: 'Autonomous AI', allowedRoles: ['SuperAdmin', 'OrgAdmin', 'FinanceManager', 'OperationsLead', 'ComplianceAuditor'] },
];

export const RbacPermissionMatrix: React.FC<RbacPermissionMatrixProps> = ({ currentTenant }) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>('FinanceManager');
  const [evalAction, setEvalAction] = useState<string>('transactions:refund_settle');

  const targetCapability = CAPABILITIES.find(c => c.key === evalAction);
  const isGranted = targetCapability?.allowedRoles.includes(selectedRole);

  const roles: RoleType[] = ['SuperAdmin', 'OrgAdmin', 'FinanceManager', 'OperationsLead', 'ComplianceAuditor'];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  Granular Role-Based Access Control (RBAC) Matrix
                </h3>
                <span className="rounded-md bg-[var(--color-status-green-bg)] px-2 py-0.5 text-xs font-semibold text-[var(--color-status-green)] border border-[var(--color-status-green-border)]">
                  5 Roles • 10 Capabilities
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Strict separation of duties. Cryptographically signed JWT claims mapped to PostgreSQL transaction roles.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Interactive Live Policy Evaluator */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[var(--color-brand)]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                Live Policy Evaluator Simulator
              </h4>
            </div>
            <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
              Tenant: {currentTenant.id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                Active Request Role
              </label>
              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value as RoleType)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-semibold text-[var(--color-text-primary)] focus:border-[var(--color-brand)] focus:outline-hidden"
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                Requested Action / Capability
              </label>
              <select
                value={evalAction}
                onChange={e => setEvalAction(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] font-mono focus:border-[var(--color-brand)] focus:outline-hidden"
              >
                {CAPABILITIES.map(c => (
                  <option key={c.key} value={c.key}>{c.label} ({c.key})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                Authorization Decision
              </label>
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg border font-mono text-xs ${
                  isGranted
                    ? 'border-[var(--color-status-green-border)] bg-[var(--color-status-green-bg)] text-[var(--color-status-green)]'
                    : 'border-[var(--color-status-red-border)] bg-[var(--color-status-red-bg)] text-[var(--color-status-red)]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {isGranted ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  <span>{isGranted ? 'ACCESS GRANTED (200 OK)' : 'ACCESS DENIED (403)'}</span>
                </div>
                <span className="text-[10px] opacity-80">
                  {isGranted ? 'Role Permitted' : 'Missing Scope'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] font-medium border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-3 px-4 w-1/3">Granular Capability</th>
                  <th className="py-3 px-3 text-center">SuperAdmin</th>
                  <th className="py-3 px-3 text-center">OrgAdmin</th>
                  <th className="py-3 px-3 text-center">FinanceMgr</th>
                  <th className="py-3 px-3 text-center">OpsLead</th>
                  <th className="py-3 px-3 text-center">Auditor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-primary)]">
                {CAPABILITIES.map(cap => (
                  <tr key={cap.key} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[var(--color-text-primary)]">{cap.label}</div>
                      <div className="font-mono text-[11px] text-[var(--color-text-muted)]">{cap.key}</div>
                    </td>
                    {roles.map(r => {
                      const allowed = cap.allowedRoles.includes(r);
                      return (
                        <td key={r} className="py-3 px-3 text-center">
                          {allowed ? (
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[var(--color-status-green-bg)] text-[var(--color-status-green)]">
                              <CheckCircle className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                              -
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
