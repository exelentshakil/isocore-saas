import { NextRequest, NextResponse } from 'next/server';
import { runTenantAiAnalysis, TenantAiAnalysisRequest } from '@/lib/tenant-ai';

export async function POST(req: NextRequest) {
  try {
    const body: TenantAiAnalysisRequest = await req.json();

    if (!body.tenantId || !body.task) {
      return NextResponse.json(
        { error: 'Missing required tenantId or task parameters' },
        { status: 400 }
      );
    }

    const result = await runTenantAiAnalysis(body);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Tenant AI Copilot execution failed', details: message },
      { status: 500 }
    );
  }
}
