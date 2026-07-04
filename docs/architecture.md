# Architecture

Core modules

- project.js
- palette.js
- symmetry.js
- canvas.js
- ui.js
- app.js (bootstrap)

Rule: each module should have one primary responsibility.

Feature handling standard

- Follow `docs/feature-handling-standard.md` for feature structure, ownership, extraction triggers, and test gates.

Feature-scope guidance

- Large initiatives should be scoped as independent feature streams.
- Map Art is planned as an independent scope so fit/zoom/render behavior can evolve without coupling to unrelated UI concerns.

Map Art scope layout (planned)

- features/map-art-core/
  - Owns fit calculations, zoom-state logic, and square-cell invariants.
  - Ships focused unit tests for fit math and zoom behavior.
- features/map-art-ui/
  - Owns Map Art controls, view wiring, and Map Art-specific styles.
- features/map-art-e2e/
  - Owns end-to-end flows for map view toggle, zoom, persistence, and 128x128 usability.

Ownership boundaries

- project-core remains the source of truth for grid data and painting behavior.
- map-art-core computes render scale inputs and never mutates project data semantics.
- studio-ui remains the shared shell; map-art-ui composes into that shell.
