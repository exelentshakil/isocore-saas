export interface Tenant {
  id: string;
  slug: string;
  name: string;
  tier: 'Growth B2B' | 'Enterprise' | 'Fintech Pro' | 'Healthcare VIP';
  isolationStrategy: 'Shared DB + RLS' | 'Dedicated Schema' | 'Isolated Partition';
  complianceTag: 'SOC2 Type II' | 'HIPAA' | 'GDPR / BaFin' | 'PCI-DSS L1';
  dbConnectionConfig: {
    poolSize: number;
    searchPath: string;
    sessionParam: string;
    region: string;
  };
  metrics: {
    monthlyVolume: number;
    activeUsers: number;
    transactionCount: number;
    slaUptime: string;
    lastAuditCheck: string;
  };
}

export interface TenantUser {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: 'SuperAdmin' | 'OrgAdmin' | 'FinanceManager' | 'OperationsLead' | 'ComplianceAuditor';
  status: 'ACTIVE' | 'MFA_REQUIRED' | 'SUSPENDED';
  mfaEnabled: boolean;
  lastLogin: string;
}

export interface TenantTransaction {
  id: string;
  tenantId: string;
  referenceId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  platformFee: number;
  netSettled: number;
  status: 'SETTLED' | 'PROCESSING' | 'ESCROW_HOLD';
  settlementAccount: string;
  riskScore: number;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  tenantId: string;
  actor: string;
  actorRole: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'SUCCESS' | 'BLOCKED_RLS' | 'MUTATION_LOGGED';
  timestamp: string;
  sha256Digest: string;
  changesSummary?: string;
}

export const ENTERPRISE_TENANTS: Tenant[] = [
  {
    id: 'ten_acme_892',
    slug: 'acme-logistics',
    name: 'Acme Logistics Corp',
    tier: 'Enterprise',
    isolationStrategy: 'Shared DB + RLS',
    complianceTag: 'SOC2 Type II',
    dbConnectionConfig: {
      poolSize: 24,
      searchPath: 'public',
      sessionParam: "SET LOCAL app.current_tenant_id = 'ten_acme_892';",
      region: 'us-east-1 (N. Virginia)',
    },
    metrics: {
      monthlyVolume: 342800,
      activeUsers: 84,
      transactionCount: 4120,
      slaUptime: '99.99%',
      lastAuditCheck: '2 mins ago',
    },
  },
  {
    id: 'ten_hrzn_410',
    slug: 'horizon-health',
    name: 'Horizon Health Systems',
    tier: 'Healthcare VIP',
    isolationStrategy: 'Dedicated Schema',
    complianceTag: 'HIPAA',
    dbConnectionConfig: {
      poolSize: 16,
      searchPath: 'tenant_hrzn_410, public',
      sessionParam: "SET LOCAL search_path = 'tenant_hrzn_410', public;",
      region: 'us-east-2 (Ohio)',
    },
    metrics: {
      monthlyVolume: 890400,
      activeUsers: 142,
      transactionCount: 8930,
      slaUptime: '99.995%',
      lastAuditCheck: '5 mins ago',
    },
  },
  {
    id: 'ten_apex_931',
    slug: 'apex-capital',
    name: 'Apex Capital Global',
    tier: 'Fintech Pro',
    isolationStrategy: 'Isolated Partition',
    complianceTag: 'GDPR / BaFin',
    dbConnectionConfig: {
      poolSize: 32,
      searchPath: 'public',
      sessionParam: "SET LOCAL app.current_tenant_id = 'ten_apex_931'; -- Part: ledger_p_apex",
      region: 'eu-central-1 (Frankfurt)',
    },
    metrics: {
      monthlyVolume: 4120000,
      activeUsers: 230,
      transactionCount: 28450,
      slaUptime: '99.999%',
      lastAuditCheck: '1 min ago',
    },
  },
  {
    id: 'ten_nova_155',
    slug: 'nova-commerce',
    name: 'Nova Commerce Group',
    tier: 'Growth B2B',
    isolationStrategy: 'Shared DB + RLS',
    complianceTag: 'PCI-DSS L1',
    dbConnectionConfig: {
      poolSize: 12,
      searchPath: 'public',
      sessionParam: "SET LOCAL app.current_tenant_id = 'ten_nova_155';",
      region: 'us-west-2 (Oregon)',
    },
    metrics: {
      monthlyVolume: 1280000,
      activeUsers: 64,
      transactionCount: 12400,
      slaUptime: '99.98%',
      lastAuditCheck: '12 mins ago',
    },
  },
];

export const INITIAL_TRANSACTIONS: TenantTransaction[] = [
  {
    id: 'tx_9841',
    tenantId: 'ten_acme_892',
    referenceId: 'INV-2026-901',
    customerName: 'Global Freightway Ltd',
    customerEmail: 'billing@globalfreight.com',
    amount: 14250.00,
    currency: 'USD',
    platformFee: 342.30,
    netSettled: 13907.70,
    status: 'SETTLED',
    settlementAccount: 'JPMorgan Chase **** 4819',
    riskScore: 4,
    createdAt: '2026-09-16T11:42:00Z',
  },
  {
    id: 'tx_9842',
    tenantId: 'ten_acme_892',
    referenceId: 'INV-2026-902',
    customerName: 'TransPacific Cargo Co',
    customerEmail: 'ops@transpacific.io',
    amount: 8640.50,
    currency: 'USD',
    platformFee: 207.67,
    netSettled: 8432.83,
    status: 'SETTLED',
    settlementAccount: 'JPMorgan Chase **** 4819',
    riskScore: 2,
    createdAt: '2026-09-16T10:15:00Z',
  },
  {
    id: 'tx_9843',
    tenantId: 'ten_acme_892',
    referenceId: 'INV-2026-903',
    customerName: 'Atlantic Intermodal Corp',
    customerEmail: 'finance@atlanticintermodal.com',
    amount: 32400.00,
    currency: 'USD',
    platformFee: 777.90,
    netSettled: 31622.10,
    status: 'PROCESSING',
    settlementAccount: 'JPMorgan Chase **** 4819',
    riskScore: 12,
    createdAt: '2026-09-16T09:30:00Z',
  },
  {
    id: 'tx_9844',
    tenantId: 'ten_acme_892',
    referenceId: 'INV-2026-904',
    customerName: 'Nordic Rail & Port SL',
    customerEmail: 'accounts@nordicrailport.eu',
    amount: 19800.00,
    currency: 'USD',
    platformFee: 475.50,
    netSettled: 19324.50,
    status: 'ESCROW_HOLD',
    settlementAccount: 'JPMorgan Chase **** 4819',
    riskScore: 48,
    createdAt: '2026-09-16T08:04:00Z',
  },
  // Horizon Health transactions
  {
    id: 'tx_7711',
    tenantId: 'ten_hrzn_410',
    referenceId: 'MED-7841-A',
    customerName: 'Midwest Regional Clinic',
    customerEmail: 'payables@midwestmed.org',
    amount: 48900.00,
    currency: 'USD',
    platformFee: 1173.90,
    netSettled: 47726.10,
    status: 'SETTLED',
    settlementAccount: 'PNC Bank N.A. **** 9931',
    riskScore: 1,
    createdAt: '2026-09-16T11:20:00Z',
  },
  {
    id: 'tx_7712',
    tenantId: 'ten_hrzn_410',
    referenceId: 'MED-7842-B',
    customerName: 'Cleveland Diagnostics Lab',
    customerEmail: 'audit@clevelanddx.org',
    amount: 12450.00,
    currency: 'USD',
    platformFee: 299.10,
    netSettled: 12150.90,
    status: 'SETTLED',
    settlementAccount: 'PNC Bank N.A. **** 9931',
    riskScore: 0,
    createdAt: '2026-09-16T10:45:00Z',
  },
  // Apex Capital transactions
  {
    id: 'tx_5531',
    tenantId: 'ten_apex_931',
    referenceId: 'APX-TR-8001',
    customerName: 'Zurich Sovereign Fund',
    customerEmail: 'treasury@zurich-sf.ch',
    amount: 450000.00,
    currency: 'USD',
    platformFee: 10800.30,
    netSettled: 439199.70,
    status: 'SETTLED',
    settlementAccount: 'Deutsche Bank Frankfurt **** 1022',
    riskScore: 5,
    createdAt: '2026-09-16T11:50:00Z',
  },
  // Nova Commerce transactions
  {
    id: 'tx_3301',
    tenantId: 'ten_nova_155',
    referenceId: 'NOV-ORD-902',
    customerName: 'Urban Outfitters Distribution',
    customerEmail: 'orders@urbanretail.com',
    amount: 15400.00,
    currency: 'USD',
    platformFee: 369.90,
    netSettled: 15030.10,
    status: 'SETTLED',
    settlementAccount: 'Silicon Valley Bank / First Citizens **** 8820',
    riskScore: 3,
    createdAt: '2026-09-16T09:12:00Z',
  },
];

export const INITIAL_USERS: TenantUser[] = [
  {
    id: 'usr_892_1',
    tenantId: 'ten_acme_892',
    name: 'Elena Rostova',
    email: 'e.rostova@acmelogistics.com',
    role: 'OrgAdmin',
    status: 'ACTIVE',
    mfaEnabled: true,
    lastLogin: 'Today, 10:14 AM',
  },
  {
    id: 'usr_892_2',
    tenantId: 'ten_acme_892',
    name: 'Marcus Vance',
    email: 'm.vance@acmelogistics.com',
    role: 'FinanceManager',
    status: 'ACTIVE',
    mfaEnabled: true,
    lastLogin: 'Today, 09:45 AM',
  },
  {
    id: 'usr_892_3',
    tenantId: 'ten_acme_892',
    name: 'Sarah Chen',
    email: 's.chen@acmelogistics.com',
    role: 'OperationsLead',
    status: 'ACTIVE',
    mfaEnabled: false,
    lastLogin: 'Yesterday, 4:30 PM',
  },
  {
    id: 'usr_892_4',
    tenantId: 'ten_acme_892',
    name: 'David Kellinger',
    email: 'd.kellinger@acmelogistics.com',
    role: 'ComplianceAuditor',
    status: 'ACTIVE',
    mfaEnabled: true,
    lastLogin: 'Sep 14, 2:15 PM',
  },
  // Horizon Health users
  {
    id: 'usr_410_1',
    tenantId: 'ten_hrzn_410',
    name: 'Dr. Arthur Sterling',
    email: 'a.sterling@horizonhealth.org',
    role: 'OrgAdmin',
    status: 'ACTIVE',
    mfaEnabled: true,
    lastLogin: 'Today, 11:05 AM',
  },
  {
    id: 'usr_410_2',
    tenantId: 'ten_hrzn_410',
    name: 'Rebecca Miller',
    email: 'r.miller@horizonhealth.org',
    role: 'ComplianceAuditor',
    status: 'ACTIVE',
    mfaEnabled: true,
    lastLogin: 'Today, 08:30 AM',
  },
];

export const INITIAL_AUDIT_LOGS: AuditEvent[] = [
  {
    id: 'aud_9011',
    tenantId: 'ten_acme_892',
    actor: 'e.rostova@acmelogistics.com',
    actorRole: 'OrgAdmin',
    action: 'TENANT_SETTINGS_UPDATE',
    resource: 'tenants/ten_acme_892/webhooks',
    ipAddress: '198.51.100.42 (US-East)',
    status: 'SUCCESS',
    timestamp: '2026-09-16T11:45:12Z',
    sha256Digest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    changesSummary: 'Rotated production outbound webhook secret key for endpoint https://api.acmelogistics.com/v1/inbound',
  },
  {
    id: 'aud_9012',
    tenantId: 'ten_acme_892',
    actor: 'm.vance@acmelogistics.com',
    actorRole: 'FinanceManager',
    action: 'PAYMENT_SETTLEMENT_BATCH',
    resource: 'ledger/batches/batch_8841',
    ipAddress: '198.51.100.89 (US-East)',
    status: 'MUTATION_LOGGED',
    timestamp: '2026-09-16T11:30:00Z',
    sha256Digest: '7a9f81d8c6b2450efb78a9c334b2f15e8c1e8b23f87c9012d98a6b5c3e2f14aa',
    changesSummary: 'Executed settlement disbursement: $13,907.70 to JPMorgan Chase **** 4819',
  },
  {
    id: 'aud_9013',
    tenantId: 'ten_acme_892',
    actor: 'ATTACKER_SESSION_SIMULATOR',
    actorRole: 'Unauthenticated/Guest',
    action: 'CROSS_TENANT_READ_ATTEMPT',
    resource: 'transactions (WHERE tenant_id = ten_hrzn_410)',
    ipAddress: '203.0.113.19 (Adversarial IP)',
    status: 'BLOCKED_RLS',
    timestamp: '2026-09-16T11:15:22Z',
    sha256Digest: '3c8e7f12a9d604b3e811c790b246a8d7e93012fcba587421de091427bc591c8a',
    changesSummary: 'PostgreSQL RLS Engine dropped query: 0 rows returned. Zero data leaked across boundary.',
  },
  {
    id: 'aud_9014',
    tenantId: 'ten_acme_892',
    actor: 'd.kellinger@acmelogistics.com',
    actorRole: 'ComplianceAuditor',
    action: 'CRYPTOGRAPHIC_VERIFICATION',
    resource: 'audit_log/chain/sha256_verify',
    ipAddress: '198.51.100.12 (US-East)',
    status: 'SUCCESS',
    timestamp: '2026-09-16T10:02:18Z',
    sha256Digest: '9f83c21a4e5d6c7b8a90123456789abcdef0123456789abcdef0123456789abc',
    changesSummary: 'Verified 4,120 transaction pre-commit digest signatures: 100% untampered match.',
  },
];
