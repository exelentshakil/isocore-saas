#!/usr/bin/env python3
"""
Production Scope & Formal Estimate Generator
IsoCore SaaS: Enterprise Multi-Tenant SaaS Architecture Discovery & 3-6 Month Implementation Plan
Client: SaaS Founder / Senior Engineering Team (Somerset, NJ, USA, EST)
Rate: $40.00/hr (Top of posted range)
Two-Track Engagement:
- Track 1: Initial Architecture Discovery & Prototype Sprint (56 Hours = $2,240.00)
- Track 2: Ongoing 3-6 Month Implementation Retainer (20-25 hrs/week @ $40.00/hr)
Built to exact BarakahSoft Gold-Standard Architecture:
- Compact, Perfectly Balanced Header (Zero Visual Bloat)
- 6 Direct Flex Children (Zero Middle Void)
- High-Density 6-Row Scope Table with Hours, Shares & Dual-Track Retainer Model
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
      margin: 5.5mm 8mm 5.5mm 8mm;
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
      line-height: 1.30;
      font-size: 8.9px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      gap: 4px;
    }}

    /* 1. Executive Header (Compact & Balanced) */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      border-bottom: 1.8px solid #635bff;
      padding-bottom: 3.5px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 7.5px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #635bff;
      margin-bottom: 1.5px;
      white-space: nowrap;
    }}
    h1 {{
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 1.5px 0;
      letter-spacing: -0.015em;
      line-height: 1.15;
      white-space: nowrap;
    }}
    .subtitle {{
      font-size: 7.6px;
      color: #475569;
      margin: 0;
      line-height: 1.2;
      white-space: nowrap;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 3.5px 8px;
      font-size: 7.6px;
      text-align: right;
      line-height: 1.3;
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
      padding: 0.5px 4.5px;
      border-radius: 9999px;
      font-size: 7.2px;
      text-transform: uppercase;
      margin-left: 2px;
    }}

    /* 2. Scope & Milestones Table */
    .scope-block {{
      margin-top: 0;
    }}
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5px;
    }}
    .section-title {{
      font-size: 8.8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f172a;
      border-left: 3px solid #635bff;
      padding-left: 5px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 7.6px;
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
      font-size: 7.7px;
      letter-spacing: 0.03em;
      border: 1px solid #cbd5e1;
      padding: 2.8px 4.5px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 2.8px 4.5px;
      font-size: 8.0px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.0px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 8.2px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 7.4px;
      margin-top: 1px;
      line-height: 1.15;
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
      padding: 3.2px 4.5px;
      font-size: 8.2px;
    }}

    /* 3. 2-Column Technical & Financial Breakdown */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      background: #f8fafc;
      padding: 3.5px 7px;
    }}
    .card-box-title {{
      font-size: 7.9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0 0 2px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 1.4px 0;
      font-size: 7.4px;
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
      font-size: 7.4px;
      color: #334155;
      margin-bottom: 1.4px;
      padding-left: 9px;
      position: relative;
      line-height: 1.15;
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
      font-size: 7.2px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      background: #ffffff;
      padding: 3.5px 7px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }}
    .term-col {{
      font-size: 7.4px;
      line-height: 1.15;
    }}
    .term-title {{
      font-weight: 800;
      color: #635bff;
      text-transform: uppercase;
      font-size: 7.2px;
      margin-bottom: 1px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 5px;
      background: #f8fafc;
      padding: 3.5px 8px;
    }}
    .auth-title {{
      font-size: 7.9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1.5px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: 7.4px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.3px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 1.5px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.1px solid #475569;
      min-height: 17px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 12px;
      color: #0f172a;
      padding-left: 3px;
      padding-bottom: 0.5px;
    }}
    .auth-date-field {{
      width: 80px;
      border-bottom: 1.1px solid #475569;
      min-height: 17px;
      font-family: ui-monospace, monospace;
      font-size: 7.4px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 0.5px;
      white-space: nowrap;
    }}
    .auth-label {{
      font-size: 6.6px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 1px;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      background: #f8fafc;
      padding: 3.5px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 7px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 29px;
      height: 29px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.3px solid #635bff;
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 0.5px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 8.1px;
      color: #0f172a;
      line-height: 1.15;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 7.4px;
      color: #334155;
      line-height: 1.15;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.0px;
      color: #475569;
      line-height: 1.15;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1.5px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 15px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.2px;
      color: #635bff;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      padding: 1px 4.5px;
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

  <!-- 1. Executive Header (Tuned, Compact, No Bloat) -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Systems Architecture • Ref #BS-2026-ISOCORE</div>
      <h1>IsoCore SaaS • Multi-Tenant Architecture Discovery &amp; 3–6 Month Roadmap</h1>
      <p class="subtitle">PostgreSQL Kernel RLS • Deterministic Ledger • 5-Role RBAC • Governed AI Copilot • SHA-256 Audit Trail</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> SaaS Founder / Senior Engineering Team (Somerset, NJ)</div>
      <div><strong>Scope:</strong> Initial Discovery Sprint (56 hrs) + 3–6 Mo Retainer Roadmap</div>
      <div><strong>Rate:</strong> <strong>$40.00/hr ($2,240 Discovery Phase • Retainer Option)</strong></div>
      <div><strong>Live Cockpit:</strong> <span class="live-badge">Verified &amp; Operational</span></div>
    </div>
  </div>

  <!-- 2. Scope Table (Discovery Sprint + 3-6 Month Roadmap) -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Delivery Schedule: Initial Discovery Sprint &amp; 3–6 Month Retainer Tracks</h2>
      <div class="section-meta">Live Cockpit: https://isocore-saas.vercel.app</div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 10%;">Engagement</th>
          <th style="width: 58%;">Multi-Tenant Architecture Deliverables &amp; Long-Term Engineering Tracks</th>
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
            <div class="phase-desc">Living prototype: 4 tenant company profiles, interactive SQL isolation simulator (0-row containment proof), deterministic ledger, 5-role RBAC tester, dual AI copilot, and DDL schema exports.</div>
          </td>
          <td style="text-align: center; font-weight: 700; white-space: nowrap;">0 hrs</td>
          <td style="text-align: center; font-weight: 700; white-space: nowrap;">Live Now</td>
          <td style="text-align: right; font-weight: 800; color: #635bff;">$0.00 (Live Ahead of Bid)</td>
        </tr>
        <tr>
          <td class="phase-num">Track 1: M1</td>
          <td>
            <div class="phase-name">Architecture Discovery, Requirements Audit &amp; Technical Risk Model</div>
            <div class="phase-desc">Detailed requirements review, database strategy selection (Shared DB vs Schema-per-tenant vs Partition), ERD relational data model, connection pool sizing, and security threat matrix.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">12 hrs</td>
          <td style="text-align: center; font-weight: 600;">Weeks 1–2</td>
          <td style="text-align: right; font-weight: 700;">$480.00</td>
        </tr>
        <tr>
          <td class="phase-num">Track 1: M2</td>
          <td>
            <div class="phase-name">PostgreSQL 16 Schema, Forced RLS Policies &amp; Connection Session Hooks</div>
            <div class="phase-desc">PostgreSQL DDL across tenants, users, transactions, and logs. Forced RLS (`FORCE ROW LEVEL SECURITY`), composite tenant indexes, connection pool checkout hooks (`SET LOCAL app.current_tenant_id`).</div>
          </td>
          <td style="text-align: center; font-weight: 600;">14 hrs</td>
          <td style="text-align: center; font-weight: 600;">Weeks 1–2</td>
          <td style="text-align: right; font-weight: 700;">$560.00</td>
        </tr>
        <tr>
          <td class="phase-num">Track 1: M3</td>
          <td>
            <div class="phase-name">Multi-Tenant REST API Engine, 5-Role RBAC &amp; Deterministic Ledger</div>
            <div class="phase-desc">Node.js (Fastify) or Python (FastAPI) backend services with tenant claims extraction from JWT. 5-role RBAC middleware guards, deterministic fee engine, and HMAC-SHA256 pre-commit audit triggers.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">15 hrs</td>
          <td style="text-align: center; font-weight: 600;">Weeks 2–3</td>
          <td style="text-align: right; font-weight: 700;">$600.00</td>
        </tr>
        <tr>
          <td class="phase-num">Track 1: M4</td>
          <td>
            <div class="phase-name">Governed Dual AI Copilot, Securiti LLM Firewall &amp; Cloud Staging Deploy</div>
            <div class="phase-desc">Dual AI copilot (gpt-4o-mini + Gemini 2.0 Flash) with inline LLM firewall (NIST AI RMF / OWASP Top 10) enforcing tenant boundary injection. Vercel / AWS staging deployment with full test suite.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">15 hrs</td>
          <td style="text-align: center; font-weight: 600;">Weeks 2–3</td>
          <td style="text-align: right; font-weight: 700;">$600.00</td>
        </tr>
        <tr>
          <td class="phase-num">Track 2: Ongoing</td>
          <td>
            <div class="phase-name">3–6 Month Product Implementation Retainer &amp; Enterprise Scaling</div>
            <div class="phase-desc">Dedicated Senior Systems Architect &amp; Lead Developer leadership: core business features, customer onboarding flows, Stripe Connect billing, SOC2 / HIPAA readiness, and automated CI/CD pipelines.</div>
          </td>
          <td style="text-align: center; font-weight: 600; white-space: nowrap;">20–25 h/wk</td>
          <td style="text-align: center; font-weight: 600;">Months 2–6</td>
          <td style="text-align: right; font-weight: 700; color: #635bff;">$40.00/hr Retainer</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">Total: Initial Discovery &amp; Prototype (56 hrs @ $40/hr) • Seamless 3–6 Mo Transition</td>
          <td style="text-align: center; font-weight: 800;">56 hrs</td>
          <td style="text-align: center; font-weight: 800;">Weeks 1–3</td>
          <td style="text-align: right; font-weight: 800; font-family: ui-monospace, monospace; font-size: 9.3px;">$2,240.00 Discovery</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Technical & Financial Breakdown -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">Engagement Structure &amp; 3–6 Month Retainer Model</div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 0: Interactive IsoCore Prototype (Delivered)</span>
        <span class="milestone-val" style="color: #635bff;">$0.00 (Live Ahead of Bid)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Track 1: Paid Discovery &amp; Architecture Sprint (Weeks 1–2, 26 hrs)</span>
        <span class="milestone-val">$1,040.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Track 1: Prototype Completion &amp; Staging Delivery (Weeks 2–3, 30 hrs)</span>
        <span class="milestone-val">$1,200.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Track 2: Months 2–3 Core Feature Velocity (20–25 hrs/wk)</span>
        <span class="milestone-val">$3,200–$4,000/mo (@ $40/hr)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Track 2: Months 4–6 Production Scaling &amp; Compliance (20–25 hrs/wk)</span>
        <span class="milestone-val">$3,200–$4,000/mo (@ $40/hr)</span>
      </div>
    </div>

    <div class="card-box">
      <div class="card-box-title">Deterministic Architecture Guardrails</div>
      <div class="guardrail-item"><strong>Kernel-Level RLS:</strong> Multi-tenant isolation enforced in PostgreSQL; missing WHERE returns 0 rows.</div>
      <div class="guardrail-item"><strong>Deterministic Mathematics:</strong> Platform fees use pure arithmetic; zero LLM math hallucination risk.</div>
      <div class="guardrail-item"><strong>Pre-Commit SHA-256 Triggers:</strong> PL/pgSQL triggers generate immutable digests for SOC2/HIPAA audits.</div>
      <div class="guardrail-item"><strong>Dual-Model Circuit Breaker:</strong> Automated failover from OpenAI gpt-4o-mini to Gemini 2.0 Flash on outage.</div>
      <div class="guardrail-item"><strong>100% Client Code Ownership:</strong> All DDL schemas, APIs, and Docker configs deployed to client's git repository.</div>
    </div>
  </div>

  <!-- 4. Commercial Terms Section -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Target Rate Aligned</div>
        <div class="term-body">$40.00/hour aligned with top of posted range. Transparent time tracking with daily git commit notes.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Initial Paid Discovery</div>
        <div class="term-body">Structured 56-hr discovery &amp; prototype sprint ($2,240) identifying risks and validating architecture.</div>
      </div>
      <div class="term-col">
        <div class="term-title">3–6 Month Retainer</div>
        <div class="term-body">Senior architect &amp; lead developer bandwidth reserved at 20–25 hrs/wk for long-term product buildout.</div>
      </div>
      <div class="term-col">
        <div class="term-title">100% Client Ownership</div>
        <div class="term-body">All code, database migrations, and cloud configurations transfer immediately with 30-day warranty.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization Block -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization &amp; Engagement Acceptance</span>
      <span style="font-weight: 500; font-size: 7.0px; color: #475569;">Binding upon signature by authorized representatives</span>
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
          <span class="auth-label" style="width: 80px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: SaaS Founder (Somerset, NJ, USA)</div>
        <div>Signatory: <strong>Engineering Evaluator</strong> • Authorized Client Representative</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 7.4px; font-style: italic;">[ Accepted via Upwork Contract Offer / Sign-off ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 80px; text-align: center;">Date</span>
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
