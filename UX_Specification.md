# Aviation Readiness & Evidence Platform
## UX specification and developer handoff

**Prototype status:** High-fidelity, responsive, interactive front-end mock-up. It is a static client-side demonstration, not a production application.  
**Source of truth:** User-provided workbook, `1795525522396-e4f0c0d5.xlsx`.  
**Workbook-derived data:** 19 countries; 97 indicators (90 scored, 7 context); 10 scored pillars with weights summing to 100%; 1,818 country evidence-log rows (622 Direct, 726 Supporting, 324 Context, 146 Gap); 466 country source-catalogue entries; 83 Review_Queue rows; 18 data-request templates. Counts are worksheet rows/entries, not deduplicated universal entities.  
**Snapshot caveat:** The workbook contains access dates including 21 November 2026 and safety EI-band references to a mid-2024 ICAO AFI report. Per-record periods and dates must be retained. No approved publication/calculation version is identified in the workbook.

---

## 1. Product principles

1. **Evidence before judgement.** Every claim and score leads to underlying evidence and source material.
2. **Missing is not zero.** No record = “No evidence” or “Not assessed”; a searched gap is “Searched, but no evidence found.” Neither is a numerical result.
3. **Coverage is separate from performance.** Counts of records, scored indicators with evidence, and share of total pillar weight covered are distinct measures.
4. **Partial remains partial.** Partial records do not become complete scores. Inference, historical reference values, caps, withheld scores and provisional results have named status labels.
5. **No ranking by default.** Comparison is blocked until indicator, period, unit, evidence threshold and approved calculation version are aligned.
6. **Approval is explicit.** Draft/unreviewed workbook content never silently becomes a published result.
7. **Accessible status.** Use text labels, symbols, patterns and contrast; never colour alone or hover-only details.

## 2. Personas

| Persona | Goals | Main concerns | Primary journeys |
|---|---|---|---|
| Public viewer / decision-maker | Understand what is known, how well supported it is and what remains uncertain | Misleading country ranking, stale results, unclear caveats | Global overview → country profile → source trail → methodology |
| Researcher | Find indicator definitions, comparable observations and source documents | Inconsistent periods/units, duplicate or weak sources, hidden gaps | Indicator explorer → evidence browser → source library → comparison gate |
| Analyst | Add and map facts, track requests, prepare evidence for review | Losing original references, incomplete source metadata, conflicting claims | Evidence browser → create/edit draft → data request → review queue |
| Reviewer | Verify provenance, mapping, grade, score cap and decision rationale | Unapproved content influencing results; missing audit record | Review workspace → evidence trail → request changes/approve → version check |
| Administrator | Safely import workbook versions and control permissions/methodology | Destructive imports, untracked changes, rollback failures | Import → validate → map → preview diff → approval → publish/rollback |
| Country focal point | See assigned country requests and supply documents | Unclear addressee, due date or evidence linkage | Assigned country view → request → response → link evidence → close |

## 3. Information architecture

**Workspace:** Global overview; country profiles; compare countries; indicator explorer; “What evidence do we have?” coverage matrix; evidence browser; source library.  
**Governance:** Review workspace; data request tracker; methodology; import and administration; UI kit and states (prototype reference).

**Core relationships**

- Country groups Indicators through country-specific Evidence records and Assessments.
- Indicator belongs to Pillar; scored indicators contribute to a calculation version, while context indicators are unweighted.
- Evidence record links to one or more Sources; preserve source URL and source-to-evidence link independently.
- Review item points to evidence, mapping, source or assessment and records status/decision/rationale.
- Data request can reference multiple indicators and later link response documents/evidence.
- Import version creates a provenance boundary for source workbook, mapping changes and audit events.
- User/role governs actions; approval and publication are separate role-authorized transitions.

## 4. Data model and required provenance

### Country
`country_id`, canonical name, ISO/code, group (`ASECNA member` / `Comparator (not ASECNA)`), country focal point, permissions. Workbook groups Rwanda and Kenya as comparators; the other 17 are ASECNA members.

### Pillar and Indicator
Pillar: code, name, weight, composite domain, methodology version. Indicator: canonical ID, name, pillar ID, core flag, lens (Capability / Implementation / Outcome / Context), plain-language definition, measurement, unit, better direction/rule, framework reference, national/international source suggestions, expected access, likely availability, scored/context type, effective dates.

### Evidence record
Preserve: Data ID; country; indicator ID; data point; value/finding; unit; observation period; Source ID; source URL; evidence grade (A–D, X); completeness (Yes / Partial / No); date accessed; notes and next step; row role (Direct / Supporting / Context / Gap); original team indicator code; original data ID; mapping basis; audit note; reviewer; approval status; original workbook sheet and row; import version. Never overwrite the original value or source reference; corrections create a new version/event.

### Source and evidence-to-source link
Source: Source ID; country scope; title; publisher; publication date (or explicitly unknown); URL; access date; archive/cached copy (or explicitly not recorded); related indicators; validation status; notes. Link: evidence ID, source ID, cited passage/page, claim supported, relationship type and reviewer validation.

### Assessment / score
Country, indicator or pillar, value/score, grade, uncapped score, capped score, cap reason, performance band, completeness/provisional/withheld/published states, safety-gate state, rationale, linked approved evidence, calculation version, reviewer approval and published timestamp. A blank is not 0. Only approved records in a named approved calculation version can affect public results.

### Workflow / audit
Review item: type, target, issue, owner, status, priority, due date, reviewer, decision, rationale. Data request: request ID, title/description, related indicators, country, addressee, channel, priority, owner, due date, status, response received, evidence links. Import version: file name/hash, workbook version, upload user/date, validation result, row-level changes, mapping changes, approval/publish state and rollback pointer. Audit event: actor, role, timestamp, action, entity/version, before/after values, reason and source.

## 5. Screen requirements and interactions

### 5.1 Global overview
- Show 19 countries; 97 indicators; evidence-log rows; Direct / Supporting / Context / Gap counts; source entries; review rows and request templates.
- Keep evidence coverage separate from scores. No prominent leaderboard.
- Include country name/code search and selector; coverage visual uses an accessible country tile map (explicitly schematic, not geographic) plus a complete table alternative.
- Show attention cards for gaps, review/mapping issues, source-link validation, conflicting evidence and overdue requests. Where the workbook lacks live status (e.g. request due dates or automated URL checks), say “not recorded / cannot verify,” not “none” or “overdue.”
- Persistent warning: workbook results are not confirmed as approved/published/comparable.

### 5.2 Country profile
- Country name/code/group; Safety EI band and listed/inferred basis; never label inferred as listed.
- Show composite and performance band only if the workbook has a result; indicate draft/source workbook and absent approved calculation version.
- Show share of total pillar weight covered, scored indicators out of 90 and indicators with evidence as separate values. Kenya source example: composite 53.148… (display 53.1), 17 scored indicators, 90% of total pillar weight covered, and 38 scored indicators with at least one fact. Explain these differ and the workbook is not an approved release.
- Show pillar results where present and explicit “Not assessed” otherwise; share of weight is not implied by a score bar.
- Evidence count visual is explicitly a coverage visual. Show facts (excluding gaps), Direct facts, gaps, catalogue sources, scored indicators with evidence and provider catalogue counts with a “catalogue entries, not live validation” caveat.
- Indicator table: score/not assessed, grade, record ID, period/access date and next action. Score opens workbook score note and related record candidates; make clear that the workbook does not identify approved score-to-evidence links.
- Export CSV, print/PDF via browser print.

### 5.3 Country comparison
- Require two distinct countries, selected scored indicator(s), matching observation period, matching unit, approved calculation version and user-selected minimum evidence threshold.
- Derive candidate periods/units from actual selected records. Never invent observations. Show values, grade, period, coverage, status and reliability warning only when a valid approved basis exists.
- Always provide accessible table alternative under any chart.
- Current workbook has no identified approved calculation version; therefore the prototype intentionally blocks results and rankings. Explain the missing requirement. Do not substitute an arbitrary version or calculate a ranking.

### 5.4 Indicator explorer
- Show ID/name, pillar/weight, core flag, lens, plain-language definition/how measured, unit/direction, framework, national/international source suggestions, access/availability and country footprint.
- Filters: country, pillar, core, grade, role, completeness, source type, period, review status. The prototype implements country, pillar, core, lens, grade, role, completeness, source type, period, review-queue and text filters.
- Indicator detail opens related country records and relevant requests; missing evidence is explicit.

### 5.5 Coverage matrix — “What evidence do we have?”
- Indicator rows and 19 country columns; every cell is a status, never a performance score.
- States: no evidence, searched gap, context only, supporting, direct, partial, complete direct, needs review. Text/shape/pattern plus accessible label supplements colour.
- Cell opens underlying records, sources, dates, notes and request links. Summary counts include facts excluding gaps, direct facts, gaps, source entries and country coverage percent.
- Provide responsive horizontal scrolling, country filter and CSV export; provide a separate country-level summary table.

### 5.6 Evidence browser
- Search/filter by country, indicator, pillar, role, grade, source, access date, review status and text. Prototype implements search, country, indicator pillar, role, grade, source, access date, completeness and review-queue presence.
- Display every record field available from workbook, including original workbook sheet/row. Open record detail includes source, mapping, notes, audit note and reviewer/approval status (say “not recorded” when absent).
- CSV export includes filtered evidence, complete source/provenance fields and original row references.

### 5.7 Source library
- Catalogue Source ID, scope, title, publisher, publication date (unknown if absent), access date, URL, archive link (unknown if absent), indicators, linked records and validation status.
- Search title, publisher, country, indicator/date/grade/source type; an access/publication-date text filter is included. Broken-link states must come from an actual link check; workbook URL notes must not be presented as current link-check results.

### 5.8 Review workspace
- Queue for mapping issues, conflicting records, expired/outdated references, missing source links, inferred classifications, score-cap issues and pending approval.
- Status flow: Draft → In review → Changes requested → Approved → Published → Superseded.
- Only approved records feed published results. Decisions require actor, timestamp, rationale and immutable history. Workbook’s 83 Review_Queue rows are candidates; their presence is not an approval status.

### 5.9 Data request tracker
- Template/live request distinction; country, related indicator(s), addressee, channel, priority, owner, due date, status, response and linked evidence.
- Flow: Draft → Sent → Follow-up needed → Response received → Evidence linked → Closed.
- Surface the workbook templates, including USOAP/USAP results, staff establishment, inspections, certification, navigation and regulatory revenue. Do not invent recipients, due dates or sent status.

### 5.10 Methodology
- Explain measured scope and exclusions, ten weighted pillars/context indicators, evidence grades/caps, partial coverage, safety gate, bands, date limits, limitations, history and challenge process.
- Bands: Critical from 0; Developing from 40; Functional from 60; Strong from 75; Leading from 90.
- Grade caps: A=5, B=5, C=3, D=2, X=1. Grade B at 4/5 requires either one A-grade source or two B-grade sources.
- State that grade X/missing evidence is not a zero-valued result. “X: maximum 1” is a score cap only if a score is otherwise allowed; a gap remains a gap.

### 5.11 Import and administration
- Admin-only, role-gated flow: upload → validate each sheet → map IDs → preview creates/updates/retires/conflicts → reviewer approval → publish new version; compare versions and rollback.
- Provide exact sheet/cell/row diagnostics and preserve original source file and references. Import never auto-publishes.
- Preview count and conflicts only after real validation; do not render invented sample counts as real.
- Record file hash, user, date, validator version, mappings, approval, publish and rollback events.

### 5.12 UI kit and states
- Reference page for buttons, filters, table/chart pairings, badges, workflow steps, breadcrumbs, modal, notifications, empty/loading/error/restricted/no-data/partial/success states and design tokens.
- The deliverable’s additional UI kit route is a reference-only design-system page; it is not a twelfth domain screen.

## 6. User journeys

### A. Decision-maker checks a country result
1. Overview displays workbook snapshot and “not approved/comparable” warning.
2. Search/select country; compare coverage counts independently from result.
3. Country profile shows EI band with listed/inferred badge; score or “Not assessed.”
4. Open score trail; inspect its rationale and related evidence candidates.
5. Open record → source page/link; review date, grade, completeness and next step.
6. Read methodology and limitations before citing the result.

### B. Researcher finds a defensible comparable measure
1. Choose indicator in explorer; read unit, better direction and source suggestions.
2. Inspect candidate direct records for both countries.
3. Compare exact periods/units and minimum evidence threshold.
4. If approved calculation version or comparable data is absent, stop with explicit reason—do not calculate or rank.
5. If later available, display paired values and grade/period/coverage table, with chart alt text/table.

### C. Analyst responds to a gap
1. Filter matrix to country/indicator; distinguish no evidence from searched gap.
2. Review suggested national/international sources and existing requests.
3. Draft request with country, indicator, addressee/channel, owner, due date and priority.
4. On response, add new evidence and source; preserve the response document and original import reference.
5. Send to review; no score changes until approval.

### D. Reviewer approves a mapped fact
1. Open review queue item; see candidate record and mapping basis.
2. Inspect source, date, role, completeness, original code and conflicting evidence.
3. Check evidence grade and score-cap/source rule, period/unit, and whether link validates.
4. Approve, reject or request changes with a reason; event is immutable and attributable.
5. If approved, generate a named calculation version; publish only after the configured authorization gates.

### E. Administrator imports a revision
1. Select workbook; retain original file/hash.
2. Validate required sheet names, headers, IDs, allowed values, formulas/cached values, links and row counts; provide exact locations.
3. Resolve mapping differences while preserving original/canonical IDs and mapping basis.
4. Inspect row-level diff and conflicts; rollback remains available.
5. Reviewer approves; publication creates a new version and records audit events.

## 7. Interaction and content rules

- Clickable status cells and score badges open an accessible detail dialog; dialogs close with Escape and explicit Close.
- All controls require visible labels; filter changes update result counts. Keyboard support must include Tab, Shift+Tab, Enter/Space, Escape, logical focus order and focus restoration after dialog close.
- Provide loading, error, empty, restricted-access, partial and success messages as visible states. No essential detail is hover-only.
- Use “Overall result” rather than “composite index”; “Highest score allowed for this type of evidence” rather than “evidence-grade cap”; “What evidence do we have?” rather than “coverage matrix”; “Searched, but no evidence found” rather than unlabeled “Gap.”
- Distinguish catalogue source entries from deduplicated unique sources and from live-verified links.
- Preserve original language/title/units from the evidence; offer English/French localization only with translated labels while keeping source content original.
- Do not infer that low coverage means poor performance; do not imply that an institution’s statutory mandate proves operational implementation.

## 8. Visual system

- Primary: Navy `#102B46`; aviation blue `#1F5E91`; pale blue `#E9F2FA`.
- Surfaces: white `#FFFFFF`; canvas `#F4F7F9`; borders `#DFE7ED`; text `#1A2938`; secondary text `#667788`.
- Functional status: green `#187553`; amber `#A66100`; red `#A43535`; grey `#586775`. Status colour always accompanies explicit text/symbol and adequate contrast.
- Typography: Manrope headings; DM Sans body; Arial fallback. Base 14 px, body text reflows at 200% zoom; headings 26/20/15 px in screen hierarchy.
- Spacing: 4, 8, 12, 16, 24, 32 px. Card radius 12 px; controls 8 px. No 3D/gauges/decorative-only graphics.
- Desktop: persistent 248 px left navigation, sticky 66 px top bar, content max-width 1510 px, two-column panels and responsive tables.
- Tablet: navigation/content compress and panels stack below ~1080 px; tables scroll rather than truncate fields.
- Mobile: sidebar replaced by horizontally scrollable navigation; single-column cards, two-column metrics, filter reflow, touch-friendly controls, horizontal matrix/table scroll, detail dialog fits viewport.

## 9. Accessibility and WCAG 2.2 AA handoff

- Treat WCAG 2.2 AA as an acceptance target, not a claim of formal certification.
- Meet text/non-text contrast, keyboard operation, visible focus, logical headings/landmarks, labels, error identification, status announcements, accessible name/role/value, minimum target size and zoom/reflow.
- Use semantic `<th scope>` table headers, captions/summary text, and a table alternative for each visualization.
- Status indicators have words and symbols; map/coverage tiles have descriptive names and values.
- Modals trap focus, announce title, close on Escape, and restore focus to trigger.
- Validate with keyboard-only, NVDA/VoiceOver-style screen-reader walkthrough, contrast checker, 200% zoom, narrow viewport and reduced-motion settings.
- French/English switch is a platform requirement to plan; translated content and source text handling require localization review.

## 10. Roles and authorization matrix

| Role | Read | Draft/edit evidence, sources, requests, mapping | Review/approve/reject | Import/methodology/users/settings | Assigned-country responses |
|---|---|---|---|---|---|
| Public viewer | Published results/evidence/sources/methodology | No | No | No | No |
| Analyst | All authorized workspaces | Yes | No | No | No |
| Reviewer | All reviewable content | Limited correction/request changes | Yes | No | No |
| Administrator | All | Yes | Approval configuration / delegated review | Yes | No |
| Country focal point | Assigned-country work | Respond/upload assigned country material | No | No | Yes |

Apply least privilege, audit authorization changes and prevent a user from approving their own draft unless explicit governance permits it.

## 11. Quality and acceptance checklist

### Evidence integrity
- [ ] Every published score links to approved evidence and its source; score and calculation version are visible.
- [ ] No missing field is displayed as zero; “not assessed,” “withheld,” “capped,” “partial,” “gap” and “complete” are distinct.
- [ ] Inferred classifications show inferred basis, reference and date.
- [ ] Source URL and archive are inspectable, with current validation date/status.
- [ ] A workbook row reference is retained for every imported record.
- [ ] Coverage, performance and source reliability are never conflated.

### Comparability and scoring
- [ ] Comparison requires matching indicator, period, unit, minimum evidence threshold and approved calculation version.
- [ ] Unapproved/incomplete/provisional scores cannot enter published aggregate results.
- [ ] Grade caps and B-grade 4/5 source rule are enforced, not merely displayed.
- [ ] Performance bands and safety gate are versioned and shown with rationale.
- [ ] No default country ranking; no inference from sparse records.

### Workflow and operations
- [ ] Import validation reports exact sheet/cell/row and never mutates the existing published version.
- [ ] Mapping, conflict, approval and publication changes are auditable.
- [ ] Rollback restores a prior approved state and preserves subsequent history.
- [ ] Request lifecycle records owner, due date, channel, response and linked evidence.
- [ ] Role access is enforced server-side; UI hiding alone is not authorization.

### Accessibility and responsive quality
- [ ] Keyboard-only journeys work end-to-end, with visible focus and no trap.
- [ ] Tables, chart alternatives, labels, statuses and error messages work with assistive technology.
- [ ] Contrast meets WCAG 2.2 AA; tested at 200% zoom and narrow mobile widths.
- [ ] No information depends only on colour, hover or desktop hover tooltip.

## 12. Developer handoff: prototype limitations and next steps

The supplied `index.html` + `data.js` are a static front-end mock-up with client-side interactions and embedded workbook data. Search, filtering, detail views, CSV downloads, print layout and navigation are demo interactions. The mock-up does **not** authenticate users, persist edits, validate live links, upload or parse new workbooks, write review decisions, send requests, produce a secure audit trail, recalculate scores, guarantee score-to-source links, or publish/rollback data. Do not use it as a production assessment system or public source of truth.

Recommended production implementation sequence:
1. Confirm canonical data dictionary, indicator taxonomy, uniqueness rules, source identity/deduplication and publication governance.
2. Obtain reviewer confirmation for score-to-evidence mapping, score caps, safety gate and approved calculation version; resolve workbook mapping ambiguities.
3. Build relational/API model with immutable import versions, evidence/source links, role authorization and audit events.
4. Implement validation and diff engine with fixture tests against all 48 workbook sheets, formula cached-value handling and row-level provenance.
5. Implement review/request transitions and role-based permissions; test self-approval policy.
6. Implement comparison gate and only enable charts after matching/currency/threshold/version rules pass.
7. Run security, privacy, accessibility, localization and reliability testing; pilot with analyst, reviewer and country focal-point roles.
8. Migrate workbook content with explicit draft status; publish only after independent review and signed-off methodology version.

**Known workbook nuances:** Country summary has a saved Kenya composite of 53.148148…, 17 scored indicators and 0.90 weight coverage; values are displayed as workbook-derived draft. The workbook has safety EI bands with both directly listed and “by exclusion” inferred bases (six inferred classifications). Country source catalogues are country-scoped entries; counts may not represent deduplicated source entities. The source workbook includes 83 review queue records and 18 request templates, but not a live workflow state for every request/review item. Source URL status is a workbook note, not an automated live check.
