# ILRDVS — Intelligent Land Record Digitization and Validation System

Frontend prototype for the Ministry of Rural Development's ILRDVS platform:
a government system for digitizing, extracting, validating, and verifying
historical land records using OCR/HTR, AI extraction, business-rule
validation, human verification, and GIS/cadastral cross-checks.

This repository contains the **complete frontend application** — login,
dashboard, document pipeline, verification workspace, land record search,
GIS map, analytics, audit trail, and administration — built against a mock
service layer that mirrors the shape of the real backend API, so it can be
swapped for live endpoints without touching any component.

## Quick start

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check and produce a production build in dist/
npm run preview    # serve the production build locally
```

No environment variables are required to run the demo — all data comes
from the mock service layer in `src/services/`. Sign in with any
Officer ID and password; the login form does not check credentials in
this build.

## Tech stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4 (CSS-first `@theme` tokens, see `src/index.css`)
- React Router v6 for routing
- Recharts for charts, Lucide for icons
- IBM Plex Sans / IBM Plex Mono for typography

## Project structure

```
src/
  components/
    ui/            Reusable primitives: Button, Card, Badge, Input, Select,
                    Tabs, Modal, Toast, Tooltip, Skeleton, EmptyState,
                    ErrorState, Pagination, Breadcrumb, StatusBadge,
                    Confidence (badge / bar / ring)
    layout/        Sidebar, Header, AppShell
    cards/         KPICard, ChartCard
    tables/        DocumentsTable
    documents/     DocumentViewer, ProcessingTimeline, FieldCard
    validation/    ValidationIssueCard
    gis/           CadastralMap (SVG parcel renderer)
  pages/           One folder per screen, matching the routes below
  services/        Mock service layer — one file per domain (auth,
                   document, processing, extraction, validation,
                   verification, record, gis, analytics, audit)
  data/mockData.ts Deterministic mock data generator (Indian states,
                   districts, villages, names, survey/khasra/khata numbers)
  types/           Shared TypeScript interfaces for every domain object
  routes/router.tsx Route table with breadcrumb metadata
  utils/format.ts   Number/date/confidence formatting helpers
```

## Routes

```
/login
/dashboard
/documents                          Document management (search/filter table)
/documents/upload                   Upload interface
/documents/processing/:id           Processing pipeline timeline
/documents/:id                      Document details
/documents/:id/ocr                  OCR / HTR viewer
/documents/:id/extraction           AI extraction viewer
/documents/:id/validation           Validation results
/verification                       Verification queue
/verification/:id                   Verification workspace (3-column)
/records                            Land record search
/records/:id                        Land record details
/gis                                GIS / cadastral map
/analytics                          Analytics & reports
/audit                              Audit trail
/admin                              Administration
/settings                           Profile & settings
```

## Connecting real APIs

Every function in `src/services/*.ts` currently resolves mock data through
`simulateLatency()` (see `src/services/api.ts`). To connect a real backend:

1. Replace the body of each service function with a `fetch()` call to the
   real endpoint — the function signature and return type are already
   correct for the UI, so no component changes are needed.
2. Set `VITE_API_BASE_URL` in a `.env` file; `API_BASE_URL` in
   `src/services/api.ts` already reads it.
3. Remove the mock data imports from `src/data/mockData.ts` once no longer
   needed for local development/demos.

## Design approach

The visual language is deliberately **not** a generic blue SaaS dashboard.
It draws on three ideas from the subject matter — archive (paper, scanned
registers), survey (cadastral boundaries, survey numbers), and verification
(evidence, confidence, audit) — rather than generic AI-dashboard styling:

- **Color** — a teal/verdigris primary (`--color-brand-*`) instead of the
  default SaaS blue, a teal-charcoal "ink" tone for chrome instead of navy,
  warm parchment neutrals for backgrounds and document surfaces, and a
  separate rust/terracotta "survey" accent used specifically for cadastral
  and evidence highlighting — kept distinct from the semantic success/
  warning/danger colors so they never get confused.
- **Type** — IBM Plex Sans for all UI text (dense tables, forms, metadata);
  IBM Plex Mono is reserved narrowly for coded identifiers (document IDs,
  record IDs, survey/khasra/khata numbers) via the `.font-ids` utility
  class, where unambiguous character shapes genuinely help.
- **The signature motif** — a "survey corner-tick" mark (small L-shaped
  brackets, borrowed from cadastral boundary-corner markers) replaces the
  default focus ring app-wide (`:focus-visible`) and marks the active
  field/page-thumbnail/parcel via the `.survey-mark` utility. It is
  functional (an accessibility focus indicator) as well as conceptually
  tied to land surveying, rather than decorative.
- **Verification Workspace** is the deliberate centerpiece: a three-column
  layout (original document → editable AI fields → validation & confidence)
  designed so an officer can see evidence, interpretation, and confidence
  side by side, with the source region highlighted in the original scan.

## Known limitations of this prototype

- All data is generated/mocked; there is no persistence between sessions.
- Authentication is not enforced — any credentials pass.
- The document viewer renders a stylised placeholder page rather than a
  real PDF/image (the interaction pattern — zoom, rotate, page nav,
  thumbnails, region highlighting — is fully wired and ready to point at
  a real renderer such as `pdf.js`).
- The GIS map is a simplified SVG parcel renderer for demonstration; a
  production build would use a mapping library (e.g. Mapbox GL, Leaflet)
  against real cadastral geometry.
- Charts use a small, fixed sample dataset rather than live aggregation.

## License

Internal prototype for the Ministry of Rural Development ILRDVS project.
