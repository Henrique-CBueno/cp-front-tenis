# Issue tracker: Local Markdown (em `processo/`)

A spec e os tickets deste repo são arquivos markdown dentro de `processo/`. Eles fazem parte da documentação do processo
que o professor avalia, por isso **não** ficam em `.scratch/`. O projeto é uma landing page só, então há uma única "feature".

## Conventions

- The spec is `processo/spec.md`
- Implementation issues are one file per ticket at `processo/tickets/<NN>-<slug>.md`, numbered from `01`, never a single combined tickets file
- Blocking edges are a `Blocked by: NN, NN` line near the top of each ticket
- Triage state is recorded as a `Status:` line near the top of each issue file (see `triage-labels.md` for the role strings)
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Write the spec to `processo/spec.md`, or create a new ticket file under `processo/tickets/` (creating the directory if needed).

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the ticket number directly (e.g. `03` → `processo/tickets/03-*.md`).

## Wayfinding operations

Used by `/wayfinder`, if ever needed. The map is `processo/wayfinding/<effort>/map.md`, with children at
`processo/wayfinding/<effort>/issues/NN-<slug>.md`, following the same `Type:`, `Status:` and `Blocked by:` conventions.
