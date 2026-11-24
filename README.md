# Aviation Readiness & Evidence Platform — prototype

This folder contains a responsive, workbook-backed front-end mock-up and UX handoff specification.

## Open the clickable prototype

1. Extract the full delivery ZIP.
2. Keep `index.html` and `data.js` together in the same folder.
3. Open `index.html` in a current desktop or mobile browser. No server or installation is required.
4. Use the left navigation on desktop or the horizontal navigation row on mobile. Country, indicator, matrix-cell, evidence-record and source details open from the relevant views.

The UI is a static demonstration. It does not authenticate users, save edits, send requests, check links live, process workbook imports, run calculations, approve records, or publish results. CSV exports/printing and filtering are local browser interactions. The comparison screen is intentionally gated because the workbook does not identify an approved calculation version.

## Included files

- `index.html` — complete responsive clickable UI and component/state reference.
- `data.js` — country, indicator, evidence, source, coverage, score-note, review and request data extracted from the supplied workbook.
- `UX_Specification.md` and `.docx` — information architecture, data model, screen requirements, journeys, governance, accessibility, acceptance criteria and developer notes.
- `README.md` — this file.

## Workbook-derived data caveat

The data is copied from the supplied source workbook and retains worksheet-row references. The UI presents existing scores as workbook-derived draft data only; it does not claim those scores or source links have been independently verified or approved. Review the workbook caveats and methodology before citing or sharing the prototype. No country ranking is generated.
