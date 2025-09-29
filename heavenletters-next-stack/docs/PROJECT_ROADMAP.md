# Heavenletters Next Stack - Project Roadmap

**Version 3.0** (Updated 2025-09-29: Finalized with full emphasis on remote MariaDB at 192.168.8.103:3306 for development; all local Keystone connections temporarily to this server—no local DB; ks_ prefix for new tables. Aligns with VMA.md/HISTORY.md; MVP timeline: 2-3 months.)

## Overview
Migrate Drupal 5 (6,620 Heavenletters, multilingual via tnid) to KeystoneJS (GraphQL CMS, MySQL ks_ prefix on remote DB at 192.168.8.103:3306) + AstroJS (static frontend). For development, the database is hosted on 192.168.8.103:3306 ('heaven' schema); all local Keystone connections are temporarily made to this remote server—no local DB setup. Preserve existing DB intact. MVP: Preserve permalinks/SEO, clean UI for viewing/basic keyword search, all HLs available in languages. Phase 2 includes LLM integration prep (indexing for future semantic search). Post-MVP: Full LLM features, premium. No Godwriting. Phased: Backend (data/LLM prep, remote DB-safe), frontend (simple UI), integration/testing, launch. Guiding: Simplicity, volunteer ease, free core, WCAG.

## Phase 1: Preparation & Planning (Completed)
- [x] Review Drupal schema (publish_number for ID/slugs, published_on/written_on, title).
- [x] Stack: KeystoneJS backend (remote DB connections for dev), AstroJS frontend (Tailwind clean UI, mdx/i18n).
- [x] VMA/HISTORY (Legacy + future; simplicity first).
- [x] Project structure: heavenletters-next-stack/ (docs/, backend/, frontend/).

## Phase 2: Backend Setup (KeystoneJS) - 1-2 weeks (MVP + LLM Integration Prep)
Focus: Migrate all 6,620 HLs with slugs to new ks_ tables on remote DB; all local dev connections to 192.168.8.103:3306; preserve existing—no deletions.
- [ ] 2.1: Install KeystoneJS 6 (`npm create keystone-app backend --with-prisma`); configure MySQL connection to remote server for local dev (host 192.168.8.103 port 3306, database 'heaven', ks_ prefix for new tables only; Prisma append mode/no-drop to avoid altering existing Drupal tables; env vars for credentials—make it clear all local connections temporarily to this remote server, no local DB; add OpenAI/HuggingFace deps for indexing).
- [ ] 2.2: Schema (Prisma: Heavenletter { nid: Int, title: String, publish_number: Int (unique), body: Text (mdx), locale: String, published_on: DateTime, written_on: DateTime, slug: String (from title+publish_number), translations: Relation (tnid), tags: Json (LLM classifiers), embeddings: Json (semantic vectors) }; User for auth/volunteers; migrate with db push --accept-data-loss=false on remote DB).
- [ ] 2.3: Sync script (Node.js/Prisma: Connect to remote DB for local dev; query Drupal GraphQL from existing remote tables; upsert all 6,620 HLs to ks_heavenletter; generate English slugs (title-slugified-publish_number.html); map translations to /[locale]/slug; integrate LLM indexing (OpenAI/HuggingFace API on body/title for tags/embeddings, store in fields); validate availability/UTF-8 without touching original tables).
- [ ] 2.4: GraphQL (Queries for HLs by slug/locale/publish_number/tags/embeddings similarity; basic auth /admin; test sync/CRUD/indexing on new ks_ tables only, remote connection for local dev).

## Phase 3: Frontend Development (AstroJS) - 2-4 weeks (MVP Focus)
Focus: Clean UI for all HLs; basic search (keyword + tag filter from LLM prep).
- [ ] 3.1: Initialize Astro (`astro new frontend --template minimal`); add Tailwind (minimal, responsive UI), @astrojs/mdx, basic i18n (path-based, subdomain optional).
- [ ] 3.2: Components (Static MDX viewer clean design; basic search (keyword + LLM tags via GraphQL); language selector).
- [ ] 3.3: Pages/routes (SSG homepage/archive all HLs; dynamic /[slug].html (English), /[locale]/[slug].html (translations); clean nav/SEO permalinks; optional subdomain).
- [ ] 3.4: Features (RSS per language; social meta; fallback Drupal; ensure full HL access via search/archive/tags).

## Phase 4: Integration & Testing - 1-2 weeks
Focus: All HLs available, clean UI, LLM prep validation on remote DB.
- [ ] 4.1: Integration (Astro queries Keystone content/search/tags from ks_ tables on remote DB; caching; test permalinks/embeddings).
- [ ] 4.2: Testing (Parity Drupal content/permalinks; E2E Playwright UI/routes/search; accessibility clean UI; confirm 6,620 HLs load; spot-check LLM tags; verify original remote DB unchanged).
- [ ] 4.3: Optimization (DB indexes on ks_ tables for slug/publish_number/locale/tags; Astro performance; UI simplicity; LLM indexing batch efficiency).

## Phase 5: Deployment & Launch - 1 week
Focus: Reliable simple rollout with LLM backend on remote DB (temporary for dev).
- [ ] 5.1: Infra (Netlify/Vercel Astro path i18n; Railway Keystone connecting to remote DB 192.168.8.103:3306; env vars DB/OpenAI for indexing; read-only to original tables if needed).
- [ ] 5.2: CI/CD (GitHub Actions build/test/deploy; sync/index trigger on ks_ tables, remote connection).
- [ ] 5.3: Launch (Full sync/index to ks_ on remote; 301 redirects; monitor availability/UI/index Sentry; confirm Drupal data preserved on 192.168.8.103).

## Post-MVP: Enhancements (3+ months)
Focus: Activate LLM, add premium.
- [ ] LLM Semantic Search: Natural queries (embeddings for topics death/relationships in frontend).
- [ ] LLM-Moderated Comments: Add schema/mutations; moderate GPT-3.5.
- [ ] Sustainability: Ebooks exports; subscriptions Stripe.
- [ ] Subscriber Forum: Discourse/Keystone paid convos.
- [ ] Subdomain i18n: If needed.
- [ ] Decommission: Archive Drupal (after verification); quarterly reviews (expand LLM based on usage).

## Risks & Mitigations
- DB Preservation: Strict Prisma config (append/no-drop); backups pre-sync; test on remote staging copy; all local dev connections to 192.168.8.103:3306—no local DB, temporary remote for local dev.
- 6,620 HL Scale: Batch sync/indexing (500/batch for LLM API).
- LLM Integration: Offline/HuggingFace for prep to minimize costs.

## Timeline & Milestones
- End Week 2: Backend/sync/LLM index complete (remote DB safe).
- End Week 4: Frontend MVP clean UI.
- End Week 6: Tested/deployed.
- End Week 7: Launch.
- Month 4+: LLM activation.

Roadmap: Simple MVP with safe remote DB handling (192.168.8.103 for all local dev connections, temporary), LLM backend prep. Track todo; refine quarterly.