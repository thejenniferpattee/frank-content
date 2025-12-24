# frank-content
Purpose
This repo stores Frank content as data: screener item text, instrument metadata, psychoeducation taxonomy, and mapping rules. This keeps content editable and auditable without changing app code.

Status
Draft content bundle populated from current Frank screenshots and current psychoeducation outline.

What this repo is
1. Instrument text and metadata used by the app.
2. Psychoeducation taxonomy and mapping skeleton.
3. A content bundle contract consumed by frank-app.

What this repo is not
1. Not participant data.
2. Not scoring implementation. Scoring lives in frank-app.

Provenance
Instrument names shown in the UI include ASRS-6, PHQ-2, and GAD-2. This repo stores the exact on-screen phrasing captured in screenshots. Scoring and clinical interpretation are handled separately and should never imply diagnosis.

How to review in 3 minutes
1. Open content/bundle.json for the full content entrypoint.
2. Open content/instruments/asrs6.json to see the item text.
3. Open content/psychoeducation/taxonomy.json to see the content map.