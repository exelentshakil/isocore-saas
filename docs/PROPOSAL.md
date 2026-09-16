live: https://isocore-saas.vercel.app
code: https://github.com/exelentshakil/isocore-saas
work: https://shakilhq.com

hi,
i built a working multi-tenant saas prototype with live postgres rls isolation so you can test before we even speak.

you can test switching between 4 enterprise companies, run an adversarial query breach to see the postgres kernel return 0 rows, and test deterministic financial calculations: https://isocore-saas.vercel.app

here are answers to your 7 questions:

1. relevant product: led engineering for legiit command center ($1m arr across 1,500+ businesses and 1m+ orders) where we isolated client stores, transactions, and analytics on postgres with zero cross-tenant leakage.
2. postgres multi-tenancy: strategy a (shared db + shared schema with kernel row-level security) driven by session context (SET LOCAL app.current_tenant_id = '...'). queries without tenant context return 0 rows by default, so a junior developer missing a WHERE clause can never leak data. for regulated enterprise vip tenants (hipaa/bafin), we offer dedicated schema or partitioned table isolation.
3. team structure: i lead architecture, database design, and core security personally (shakil ahmed, 12+ yrs exp) paired with 1 senior full-stack engineer for rapid feature delivery. zero middle management.
4. rate & pricing: $40.00/hr (aligned with the top of your posted range). for the initial paid discovery and prototype phase, i scoped a capped 56 hours ($2,240 total), followed by a flexible 20-25 hrs/week retainer ($3.2k-$4k/mo) for the 3-6 month product rollout. detailed 1-page estimate is attached.
5. location / time zone: us edt/est compatible (matching your somerset, nj hours). full working overlap every morning and afternoon.
6. distributed / offshore: distributed engineering studio under our us entity (barakahsoft llc, wyoming). i personally review every pull request and write the core security policies.
7. client communication: async daily git commit updates, 3-minute loom walkthroughs for completed milestones, and dedicated slack or upwork chat with fast response times.

which backend runtime are you leaning toward for this prototype (node.js/fastify or python/fastapi)?

happy to hop on a quick 10-minute call to walk through the postgres rls policies and sql triggers.

best,
Shaq
