'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ReviewerTour } from '@/components/ReviewerTour';
import { BentoGrid } from '@/components/BentoGrid';
import { PostgresArchitectureConsole } from '@/components/PostgresArchitectureConsole';
import { TenantOperationsHub } from '@/components/TenantOperationsHub';
import { RbacPermissionMatrix } from '@/components/RbacPermissionMatrix';
import { AuditLogExplorer } from '@/components/AuditLogExplorer';
import { TenantAiCopilot } from '@/components/TenantAiCopilot';
import { RoiCostCalculator } from '@/components/RoiCostCalculator';
import { BlueprintExporter } from '@/components/BlueprintExporter';
import { ChaosSimulatorModal } from '@/components/ChaosSimulatorModal';
import { AiGovernanceDrawer } from '@/components/AiGovernanceDrawer';
import { ExecutionLogDrawer } from '@/components/ExecutionLogDrawer';
import { CommandMenu } from '@/components/CommandMenu';
import { Footer } from '@/components/Footer';
import {
  Tenant,
  ENTERPRISE_TENANTS,
  INITIAL_TRANSACTIONS,
  INITIAL_AUDIT_LOGS,
  TenantTransaction,
  AuditEvent,
} from '@/lib/tenant-data';

export default function HomePage() {
  const [currentTenant, setCurrentTenant] = useState<Tenant>(ENTERPRISE_TENANTS[0]);
  const [transactions, setTransactions] = useState<TenantTransaction[]>(INITIAL_TRANSACTIONS);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(INITIAL_AUDIT_LOGS);

  const [activeSection, setActiveSection] = useState('briefing');
  const [chaosModalOpen, setChaosModalOpen] = useState(false);
  const [governanceDrawerOpen, setGovernanceDrawerOpen] = useState(false);
  const [logsDrawerOpen, setLogsDrawerOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddTransaction = (newTx: TenantTransaction) => {
    setTransactions(prev => [newTx, ...prev]);

    // Simulate PostgreSQL SHA-256 pre-commit trigger
    const newAuditEvent: AuditEvent = {
      id: `aud_${Math.floor(1000 + Math.random() * 9000)}`,
      tenantId: currentTenant.id,
      actor: 'finance_manager@' + currentTenant.slug + '.com',
      actorRole: 'FinanceManager',
      action: 'TRANSACTION_MUTATION',
      resource: `transactions/${newTx.id}`,
      ipAddress: '198.51.100.22 (TLS v1.3 Verified)',
      status: 'MUTATION_LOGGED',
      timestamp: new Date().toISOString(),
      sha256Digest: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      changesSummary: `Committed new deterministic transaction: $${newTx.amount.toFixed(2)} (${newTx.referenceId}) with net settlement $${newTx.netSettled.toFixed(2)}.`,
    };

    setAuditEvents(prev => [newAuditEvent, ...prev]);
  };

  useEffect(() => {
    const sectionIds = [
      'briefing',
      'metrics',
      'postgres-rls',
      'operations',
      'rbac',
      'audit-log',
      'ai-copilot',
      'roi',
      'blueprints',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      <Header
        currentTenant={currentTenant}
        onSelectTenant={setCurrentTenant}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenChaosModal={() => setChaosModalOpen(true)}
        onOpenGovernanceDrawer={() => setGovernanceDrawerOpen(true)}
        onOpenLogsDrawer={() => setLogsDrawerOpen(true)}
        onOpenCommandMenu={() => setCommandMenuOpen(true)}
      />

      <main className="w-full max-w-full min-w-0 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          <section id="briefing" className="scroll-mt-20">
            <ReviewerTour
              onNavigate={handleNavigate}
              onOpenChaosModal={() => setChaosModalOpen(true)}
            />
          </section>

          <section id="metrics" className="scroll-mt-20">
            <BentoGrid currentTenant={currentTenant} />
          </section>

          <section id="postgres-rls" className="scroll-mt-20">
            <PostgresArchitectureConsole currentTenant={currentTenant} />
          </section>

          <section id="operations" className="scroll-mt-20">
            <TenantOperationsHub
              currentTenant={currentTenant}
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
            />
          </section>

          <section id="rbac" className="scroll-mt-20">
            <RbacPermissionMatrix currentTenant={currentTenant} />
          </section>

          <section id="audit-log" className="scroll-mt-20">
            <AuditLogExplorer
              currentTenant={currentTenant}
              auditEvents={auditEvents}
            />
          </section>

          <section id="ai-copilot" className="scroll-mt-20">
            <TenantAiCopilot
              currentTenant={currentTenant}
              transactions={transactions}
              auditEvents={auditEvents}
            />
          </section>

          <section id="roi" className="scroll-mt-20">
            <RoiCostCalculator />
          </section>

          <section id="blueprints" className="scroll-mt-20">
            <BlueprintExporter />
          </section>
        </div>
      </main>

      <Footer />

      <ChaosSimulatorModal
        open={chaosModalOpen}
        onOpenChange={setChaosModalOpen}
      />

      <AiGovernanceDrawer
        open={governanceDrawerOpen}
        onOpenChange={setGovernanceDrawerOpen}
      />

      <ExecutionLogDrawer
        open={logsDrawerOpen}
        onOpenChange={setLogsDrawerOpen}
      />

      <CommandMenu
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
        onOpenChaos={() => {
          setCommandMenuOpen(false);
          setChaosModalOpen(true);
        }}
        onOpenGovernance={() => {
          setCommandMenuOpen(false);
          setGovernanceDrawerOpen(true);
        }}
        onOpenLogs={() => {
          setCommandMenuOpen(false);
          setLogsDrawerOpen(true);
        }}
      />
    </div>
  );
}
