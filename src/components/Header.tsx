'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import {
  Database,
  CreditCard,
  Shield,
  History,
  Bot,
  SlidersHorizontal,
  Zap,
  Terminal,
  Sun,
  Moon,
  ChevronDown,
  Command as CommandIcon,
  Building2,
  Calculator,
  Download,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tenant, ENTERPRISE_TENANTS } from '@/lib/tenant-data';

interface HeaderProps {
  currentTenant: Tenant;
  onSelectTenant: (tenant: Tenant) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
  onOpenGovernanceDrawer: () => void;
  onOpenLogsDrawer: () => void;
  onOpenCommandMenu: () => void;
}

export function Header({
  currentTenant,
  onSelectTenant,
  activeSection,
  onNavigate,
  onOpenChaosModal,
  onOpenGovernanceDrawer,
  onOpenLogsDrawer,
  onOpenCommandMenu,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  // Primary 5 high-signal navigation anchors
  const primaryNavItems = [
    { id: 'briefing', label: 'Briefing', icon: Layers },
    { id: 'postgres-rls', label: 'PostgreSQL RLS', icon: Database },
    { id: 'operations', label: 'Ledger & Ops', icon: CreditCard },
    { id: 'rbac', label: 'RBAC Matrix', icon: Shield },
    { id: 'audit-log', label: 'Audit Log', icon: History },
    { id: 'ai-copilot', label: 'AI Copilot', icon: Bot },
  ];

  // Secondary navigation anchors
  const secondaryNavItems = [
    { id: 'roi', label: 'Cost & ROI Engine', icon: Calculator, desc: 'Multi-tenant cloud infrastructure ROI' },
    { id: 'blueprints', label: 'Architecture Blueprints', icon: Download, desc: 'Enterprise architecture diagrams & DDL' },
  ];

  const isSecondaryActive = secondaryNavItems.some((item) => item.id === activeSection);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md">
      {/* Top Main Navigation Bar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Left Brand Anchor & Active Tenant Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('briefing')}
            className="group flex items-center gap-2 text-left transition-opacity hover:opacity-90"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white shadow-xs font-bold text-sm">
              <Database className="h-4 w-4" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                IsoCore
              </span>
              <span className="text-xs font-bold text-[var(--color-brand)]">
                SaaS
              </span>
            </div>
          </button>

          {/* Sleek Tenant Switcher Dropdown */}
          <div className="hidden sm:block border-l border-[var(--color-border)] pl-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
                  <Building2 className="h-3.5 w-3.5 text-[var(--color-brand)]" />
                  <span className="font-semibold text-[var(--color-text-primary)] truncate max-w-[130px]">
                    {currentTenant.name}
                  </span>
                  <ChevronDown className="h-3 w-3 text-[var(--color-text-muted)]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 bg-[var(--color-surface)] border border-[var(--color-border)] p-1.5 shadow-lg">
                <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Switch Active Company (Isolated Context)
                </div>
                {ENTERPRISE_TENANTS.map((tenant) => (
                  <DropdownMenuItem
                    key={tenant.id}
                    onClick={() => onSelectTenant(tenant)}
                    className={`flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs ${
                      tenant.id === currentTenant.id
                        ? 'bg-[var(--color-brand-subtle)] font-semibold text-[var(--color-brand)]'
                        : 'text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]'
                    }`}
                  >
                    <Building2 className="h-4 w-4 mt-0.5 text-[var(--color-brand)] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{tenant.name}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono">{tenant.id}</span>
                        <span>•</span>
                        <span>{tenant.isolationStrategy}</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Zone 2: Center Streamlined Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)]">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold shadow-xs border border-[var(--color-border)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/50'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-[var(--color-brand)]' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Sleek "More" Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSecondaryActive
                    ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold shadow-xs border border-[var(--color-border)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/50'
                }`}
              >
                <span>More</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[var(--color-surface)] border border-[var(--color-border)] p-1.5">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs ${
                      isActive ? 'bg-[var(--color-panel-subtle)] font-semibold text-[var(--color-brand)]' : 'text-[var(--color-text-primary)]'
                    }`}
                  >
                    <Icon className="h-4 w-4 mt-0.5 text-[var(--color-brand)] shrink-0" />
                    <div>
                      <div className="font-medium leading-none">{item.label}</div>
                      <div className="text-xs text-[var(--color-text-muted)] mt-1 font-normal">{item.desc}</div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Zone 3: Right Operations & Utilities */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search ⌘K Button */}
          <button
            onClick={onOpenCommandMenu}
            className="hidden sm:flex h-8 items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-slate-400 transition-colors cursor-pointer"
            title="Quick Navigation Palette (⌘K)"
          >
            <CommandIcon className="h-3.5 w-3.5" />
            <kbd className="rounded bg-[var(--color-surface)] px-1 py-0.5 text-xs font-mono font-bold border border-[var(--color-border)] text-[var(--color-text-primary)]">
              ⌘K
            </kbd>
          </button>

          {/* Consolidated Diagnostics & Governance Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex h-8 items-center gap-1.5 text-xs border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-panel-subtle)] px-2.5 whitespace-nowrap cursor-pointer"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                <span>Diagnostics</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 bg-[var(--color-surface)] border border-[var(--color-border)] p-1.5">
              <DropdownMenuItem
                onClick={onOpenChaosModal}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Zap className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                <div>
                  <div className="font-bold text-[var(--color-text-primary)]">Chaos & Failure Test</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Simulate DB pool timeout & cross-tenant breach</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onOpenGovernanceDrawer}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Shield className="h-4 w-4 mt-0.5 text-[var(--color-brand)] shrink-0" />
                <div>
                  <div className="font-bold text-[var(--color-text-primary)]">NIST AI RMF Posture</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Securiti certified OWASP LLM guardrails</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onOpenLogsDrawer}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Terminal className="h-4 w-4 mt-0.5 text-indigo-500 shrink-0" />
                <div>
                  <div className="font-bold text-[var(--color-text-primary)]">Live Pipeline Event Logs</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Real-time HTTP & RLS transaction traces</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* High-Contrast Action CTA: Chaos Test */}
          <Button
            size="sm"
            onClick={onOpenChaosModal}
            className="h-8 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs border border-amber-600/30 whitespace-nowrap shrink-0 px-3 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 mr-1" />
            <span>Chaos Test</span>
          </Button>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 p-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] cursor-pointer"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Pill Navigation */}
      <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-canvas)] py-1.5 px-4 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {[...primaryNavItems, ...secondaryNavItems].map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[var(--color-brand)] text-white font-semibold shadow-xs'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
              }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
