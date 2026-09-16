import { NextRequest, NextResponse } from 'next/server';
import { runTenantAiAnalysis, TenantAiAnalysisRequest, TenantAiTask } from '@/lib/tenant-ai';
import { ENTERPRISE_TENANTS, INITIAL_TRANSACTIONS, INITIAL_AUDIT_LOGS } from '@/lib/tenant-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const tenantId = body.tenantId || 'ten_acme_892';
    const task: TenantAiTask = body.task || body.queryType || 'ANOMALY_DETECTION';

    const tenant = ENTERPRISE_TENANTS.find((t) => t.id === tenantId || t.slug === tenantId) || ENTERPRISE_TENANTS[0];

    const tenantTransactions = INITIAL_TRANSACTIONS.filter((tx) => tx.tenantId === tenant.id);
    const tenantAuditLogs = INITIAL_AUDIT_LOGS.filter((log) => log.tenantId === tenant.id);

    const fullRequest: TenantAiAnalysisRequest = {
      tenantId: tenant.id,
      tenantName: body.tenantName || tenant.name,
      task: task,
      userPrompt: body.userPrompt || body.customPrompt || '',
      contextData: body.contextData || {
        isolationStrategy: tenant.isolationStrategy,
        metrics: tenant.metrics,
        recentTransactions: tenantTransactions.map((tx) => ({
          id: tx.id,
          referenceId: tx.referenceId,
          amount: tx.amount,
          platformFee: tx.platformFee,
          netSettled: tx.netSettled,
          status: tx.status,
          riskScore: tx.riskScore,
        })),
        recentAuditEvents: tenantAuditLogs.map((log) => ({
          action: log.action,
          status: log.status,
          actor: log.actor,
          resource: log.resource,
          sha256Digest: log.sha256Digest,
        })),
      },
      simulatedOutage: !!body.simulatedOutage,
    };

    const result = await runTenantAiAnalysis(fullRequest);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Tenant AI Copilot execution failed', details: message },
      { status: 500 }
    );
  }
}
