#!/usr/bin/env python3
"""
Production Scope & Formal Estimate Generator
IsoCore SaaS: Enterprise Multi-Tenant SaaS Prototype & Architecture Discovery
Client: SaaS Founder / Senior Engineering Team (Somerset, NJ, USA, EST)
Hourly Rate: $40.00/hr (56 Total Hours = $2,240.00 Turnkey Delivery)
Built to exact BarakahSoft Gold-Standard Architecture:
- 6 Direct Flex Children (Zero Middle Void)
- High-Density 6-Row Scope Table with Hours & Dollar Allocations
- Verified Upwork Partner Credentials (Never "Top Rated")
- Dual Signature Block with Formal Authorization
- Inlined Base64 Assets and Headless Chrome Single-Page PDF Audit
"""

import os
import re
import base64
import subprocess
import sys

def build_estimate():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.abspath(os.path.join(current_dir, ".."))
    docs_dir = os.path.join(project_dir, "docs")
    html_path = os.path.join(docs_dir, "estimate.html")
    pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

    headshot_file = os.path.join(docs_dir, "headshot.jpeg")
    logo_file = os.path.join(docs_dir, "logo.png")

    with open(headshot_file, "rb") as f:
        headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

    with open(logo_file, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode("utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope &amp; Formal Estimate - IsoCore Multi-Tenant SaaS Prototype</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.32;
      font-size: 9.2px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      gap: 5px;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #635bff;
      padding-bottom: 5px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #635bff;
      margin-bottom: 2px;
      white-space: nowrap;
    }}
    h1 {{
      font-size: 13.5px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .subtitle {{
      font-size: 8.4px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
      white-space: nowrap;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px 10px;
      font-size: 8.1px;
      text-align: right;
      line-height: 1.35;
      white-space: nowrap;
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #eef2ff;
      color: #635bff;
      border: 1px solid #c7d2fe;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 7.8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope & Milestones Table */
    .scope-block {{
      margin-top: 0;
    }}
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }}
    .section-title {{
      font-size: 9.3px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      border-left: 3px solid #635bff;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.1px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.0px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 3.2px 5px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 3.2px 5px;
      font-size: 8.3px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.3px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 8.5px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 7.7px;
      margin-top: 1px;
      line-height: 1.18;
    }}
    .phase-0-row {{
      background: #f5f3ff;
    }}
    .phase-0-badge {{
      color: #635bff;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 3.8px 5px;
      font-size: 8.5px;
    }}

    /* 3. 2-Column Technical & Financial Breakdown */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 4px 8px;
    }}
    .card-box-title {{
      font-size: 8.2px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0 0 2px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 1.6px 0;
      font-size: 7.6px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 7.6px;
      color: #334155;
      margin-bottom: 1.6px;
      padding-left: 10px;
      position: relative;
      line-height: 1.18;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #635bff;
      font-weight: 800;
      font-size: 7.4px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 4px 8px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 7px;
    }}
    .term-col {{
      font-size: 7.6px;
      line-height: 1.18;
    }}
    .term-title {{
      font-weight: 800;
      color: #635bff;
      text-transform: uppercase;
      font-size: 7.5px;
      margin-bottom: 1px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #f8fafc;
      padding: 4.5px 9px;
    }}
    .auth-title {{
      font-size: 8.2px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 2.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 1.5px;
      font-size: 7.7px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.6px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 2px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 19px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 13px;
      color: #0f172a;
      padding-left: 4px;
      padding-bottom: 1px;
    }}
    .auth-date-field {{
      width: 85px;
      border-bottom: 1.2px solid #475569;
      min-height: 19px;
      font-family: ui-monospace, monospace;
      font-size: 7.7px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1px;
      white-space: nowrap;
    }}
    .auth-label {{
      font-size: 6.8px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 1.5px;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 4px 9px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #635bff;
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 8.5px;
      color: #0f172a;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 7.7px;
      color: #334155;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.3px;
      color: #475569;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 16px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.5px;
      color: #635bff;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      padding: 1px 5px;
      border-radius: 3px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      text-decoration: none;
      white-space: nowrap;
    }}
  </style>
</head>
<body>
<div class="page-container">

  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Enterprise Systems Engineering • Ref #BS-2026-ISOCORE-SAAS</div>
      <h1>IsoCore SaaS • Multi-Tenant Enterprise Architecture &amp; Prototype Delivery</h1>
      <p class="subtitle">PostgreSQL Kernel RLS • Deterministic Financial Ledger • 5-Role RBAC • Dual AI (OpenAI+Gemini) • SHA-256 Audit Trail</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> SaaS Founder / Senior Engineering Evaluation (Somerset, NJ)</div>
      <div><strong>Scope:</strong> Architecture Discovery &amp; Prototype (56 Hours)</div>
      <div><strong>Investment:</strong> <strong>$40.00/hr • $2,240.00 Turnkey Package (2 Weeks)</strong></div>
      <div><strong>Live Cockpit:</strong> <span class="live-badge">Verified &amp; Operational</span></div>
    </div>
  </div>

  <!-- 2. Scope Table -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Production Scope &amp; Operating Milestone Delivery Schedule</h2>
      <div class="section-meta">Live Cockpit: https://isocore-saas.vercel.app</div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 10%;">Milestone</th>
          <th style="width: 58%;">Multi-Tenant SaaS Engineering Deliverables &amp; Architectural Guardrails</th>
          <th style="width: 8%; text-align: center;">Hours</th>
          <th style="width: 10%; text-align: center;">Timeline</th>
          <th style="width: 14%; text-align: right;">Investment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num"><span class="phase-0-badge">Phase 0</span></td>
          <td>
            <div class="phase-name">Interactive IsoCore Multi-Tenant Cockpit &amp; SQL Blueprints (Delivered)</div>
            <div class="phase-desc">Living demo: 4 enterprise tenant profiles, interactive SQL isolation simulator (0-row containment proof), deterministic financial ledger, 5-role RBAC live policy tester, dual AI copilot, and DDL schema exports.</div>
          </td>
          <td style="text-align: center; font-weight: 700; white-space: nowrap;">0 hrs</td>
          <td style="text-align: center; font-weight: 700; white-space: nowrap;">Live Now</td>
          <td style="text-align: right; font-weight: 800; color: #635bff;">$0.00 (Live Ahead of Bid)</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 1</td>
          <td>
            <div class="phase-name">PostgreSQL Multi-Tenant Schema &amp; Kernel-Level RLS Policies</div>
            <div class="phase-desc">PostgreSQL 16 relational design across tenants, users, transactions, and audit trails. Forced RLS (`FORCE ROW LEVEL SECURITY`), composite tenant indexes, connection pool session hooks (`SET LOCAL app.current_tenant_id`).</div>
          </td>
          <td style="text-align: center; font-weight: 600;">10 hrs</td>
          <td style="text-align: center; font-weight: 600;">Days 1–3</td>
          <td style="text-align: right; font-weight: 700;">$400.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 2</td>
          <td>
            <div class="phase-name">Multi-Tenant REST API Engine, Session Middleware &amp; Auth Isolation</div>
            <div class="phase-desc">Node.js (Fastify/Next.js) or Python (FastAPI) backend services with tenant resolution from JWT claims. Connection pool checkout middleware executing tenant session binding per query transaction. Full OpenAPI 3.1 spec.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">12 hrs</td>
          <td style="text-align: center; font-weight: 600;">Days 4–6</td>
          <td style="text-align: right; font-weight: 700;">$480.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 3</td>
          <td>
            <div class="phase-name">Granular 5-Role RBAC Permission Matrix &amp; Live Policy Evaluator</div>
            <div class="phase-desc">5 enterprise roles (SuperAdmin, OrgAdmin, FinanceManager, OperationsLead, ComplianceAuditor) mapped to 10 granular capabilities. Dynamic policy guards, capability caching, and real-time HTTP 200 vs 403 access control.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">10 hrs</td>
          <td style="text-align: center; font-weight: 600;">Days 7–8</td>
          <td style="text-align: right; font-weight: 700;">$400.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 4</td>
          <td>
            <div class="phase-name">Deterministic Financial Ledger &amp; SHA-256 Pre-Commit Audit Triggers</div>
            <div class="phase-desc">Pure mathematical take-rate calculation (ROUND(Gross * 0.024 + 0.30, 2)). Zero LLM math risk. PostgreSQL PL/pgSQL pre-commit trigger generating HMAC-SHA256 digests of every row mutation for immutable audit logs.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">12 hrs</td>
          <td style="text-align: center; font-weight: 600;">Days 9–11</td>
          <td style="text-align: right; font-weight: 700;">$480.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 5</td>
          <td>
            <div class="phase-name">Dual-Model AI Copilot, Securiti LLM Firewall &amp; Tenant Context Isolation</div>
            <div class="phase-desc">Enterprise AI copilot (gpt-4o-mini primary + Gemini 2.0 Flash fallback). Securiti-certified inline firewall enforcing NIST AI RMF 100-1 / OWASP Top 10 for LLMs (prompt injection defense, PII masking, strict tenant context boundary).</div>
          </td>
          <td style="text-align: center; font-weight: 600;">12 hrs</td>
          <td style="text-align: center; font-weight: 600;">Days 12–14</td>
          <td style="text-align: right; font-weight: 700;">$480.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Total Turnkey Multi-Tenant SaaS Delivery (56 Hours @ $40.00/hr)</td>
          <td style="text-align: center; font-weight: 800;">56 hrs</td>
          <td style="text-align: center; font-weight: 800;">2 Weeks</td>
          <td style="text-align: right; font-weight: 800; font-family: ui-monospace, monospace; font-size: 9.8px;">$2,240.00</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Technical & Financial Breakdown -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">Operating Engagement &amp; Milestone Breakdown</div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 0: Interactive IsoCore Demo &amp; Blueprints</span>
        <span class="milestone-val" style="color: #635bff;">$0.00 (Live Ahead of Bid)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 1: PostgreSQL Schema &amp; RLS Policies (10 hrs)</span>
        <span class="milestone-val">$400.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 2: Multi-Tenant REST API &amp; Session Pool (12 hrs)</span>
        <span class="milestone-val">$480.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 3: Granular 5-Role RBAC Matrix (10 hrs)</span>
        <span class="milestone-val">$400.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 4: Deterministic Ledger &amp; SHA-256 Triggers (12 hrs)</span>
        <span class="milestone-val">$480.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 5: Dual AI Copilot &amp; Securiti Firewall (12 hrs)</span>
        <span class="milestone-val">$480.00</span>
      </div>
    </div>

    <div class="card-box">
      <div class="card-box-title">Deterministic Architecture Guardrails</div>
      <div class="guardrail-item"><strong>Kernel-Level Enforcement:</strong> Row-Level Security runs in PostgreSQL engine; missing WHERE clause returns 0 rows.</div>
      <div class="guardrail-item"><strong>Deterministic Mathematics:</strong> Platform fees use pure arithmetic; zero LLM math hallucination risk.</div>
      <div class="guardrail-item"><strong>Zero-Tamper Cryptography:</strong> Audit logs hashed pre-commit with HMAC-SHA256 for SOC2/HIPAA compliance.</div>
      <div class="guardrail-item"><strong>Dual-Model Circuit Breaker:</strong> Automated failover from OpenAI gpt-4o-mini to Gemini 2.0 Flash on API outage.</div>
      <div class="guardrail-item"><strong>100% Client Code Ownership:</strong> All DDL schemas, APIs, and Docker configs deployed to client's git repository.</div>
    </div>
  </div>

  <!-- 4. Commercial Terms Section -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Target Rate Aligned</div>
        <div class="term-body">$40.00/hour aligned with top of posted range. Transparent time tracking with detailed git commit logs.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Zero Data Leakage</div>
        <div class="term-body">Architected to prevent cross-company data leakage by binding isolation to the PostgreSQL database kernel.</div>
      </div>
      <div class="term-col">
        <div class="term-title">100% Code Ownership</div>
        <div class="term-body">All code, database migrations, and cloud configurations transfer immediately to your team upon completion.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Long-Term Retainer</div>
        <div class="term-body">Seamless continuation into 3–6+ month product roadmap at 20–30 hrs/week with senior architectural leadership.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization Block -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization &amp; Engagement Acceptance</span>
      <span style="font-weight: 500; font-size: 7.2px; color: #475569;">Binding upon signature by authorized representatives</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Architect: BarakahSoft LLC (Wyoming, USA)</div>
        <div>Signatory: <strong>Shakil Ahmed</strong> • Principal Systems Architect &amp; Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">16 Sep 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Architect Signature</span>
          <span class="auth-label" style="width: 85px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: SaaS Founder (Somerset, NJ, USA)</div>
        <div>Signatory: <strong>Engineering Evaluator</strong> • Authorized Client Representative</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 7.8px; font-style: italic;">[ Accepted via Upwork Contract Offer / Sign-off ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 85px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Principal Systems Architect &amp; Founder (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise Systems Engineering &amp; AI Governance</div>
        <div class="founder-sub">Securiti Certified AI Security &amp; Governance Architect (Cert ID: 14B411BCE-14B411A3D-1451CFE76) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://isocore-saas.vercel.app" target="_blank" class="demo-badge">isocore-saas.vercel.app</a>
    </div>
  </div>

</div>
</body>
</html>
"""

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print("Saved estimate.html to:", html_path)

    # Compile with Headless Chrome using absolute file URI
    chrome_cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        f"file://{os.path.abspath(html_path)}"
    ]

    res = subprocess.run(chrome_cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
        print("File size:", os.path.getsize(pdf_path), "bytes")
    else:
        print("Chrome print-to-pdf error:", res.stderr, file=sys.stderr)
        sys.exit(1)

    # Verify page count
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
    print(f"Verified PDF page count: {len(pages)} page(s)")
    if len(pages) != 1:
        print(f"CRITICAL ERROR: Expected exactly 1 page, got {len(pages)}!", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    build_estimate()
