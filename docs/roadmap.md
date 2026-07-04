# Roadmap

## Completed

- Project object (ADR-0001)
- Transform engine with symmetry modes
- 180° rotational symmetry
- 4-way radial symmetry
- 8-way radial symmetry
- Starter template library
- Modular architecture (project.js, canvas.js, ui.js, app.js)
- GitHub Pages deployment workflow
- Release-driven versioning system
- Dynamic version display in footer

## Current

- Variable canvas sizes

## Next

- Non-destructive resize

## Upcoming

- Selectable palettes
- Preset palette sets
- Save/load projects

## v7.0.0 Candidate: Map Art Workspace (Independent Scope)

Goal: support 128x128 map art workflows without forcing constant page scrolling.

Scope strategy: deliver Map Art as a standalone feature stream with its own milestones, acceptance criteria, and tests.

Hard constraint: cells must remain perfect squares at all times.

In scope:

- Map Art View toggle and compact-fit behavior.
- Zoom controls and fit reset for overview/detail workflow.
- 128x128 usability and performance tuning.
- State persistence for Map Art view, zoom, and canvas size.
- Dedicated core/e2e/a11y coverage for Map Art behaviors.
- Independent feature folder structure for Map Art modules and tests.

Proposed folder structure:

- features/map-art-core/
  - map-art-core.js
  - map-art-core.test.js
  - viewport-fit.js
  - viewport-fit.test.js
  - zoom-state.js
  - zoom-state.test.js
- features/map-art-ui/
  - map-art-ui.js
  - map-art-ui.css
- features/map-art-e2e/
  - map-art-e2e.test.cjs
  - run-map-art-e2e.sh

Integration boundaries:

- Existing features/project-core stays owner of project data and paint rules.
- Existing features/studio-ui hosts shared shell controls and wires Map Art UI hooks.
- Existing features/studio-e2e keeps baseline user-flow tests; map-art-e2e covers Map Art-specific flows.

Out of scope:

- Palette redesigns unrelated to Map Art readability.
- Motif-library content expansion.
- Surface-type changes (hex/triangle).
- Save/load project schema changes beyond storing map-art view preferences.

Proposed feature:

- Add a Map Art toggle that switches the canvas into a compact viewing mode.
- In compact mode, cell size is reduced enough to show most or all of a 128x128 frame in the viewport.
- Keep normal mode available for detail work so makers can switch between overview and precision.
- Add zoom controls so makers can move between overview framing and detailed editing without changing canvas dimensions.
- Enforce one scalar cell size per render frame so width and height of every cell remain equal.

Proposed UX behavior:

- Toggle label: "Map Art View".
- Default state: off for standard projects.
- When on:
  - Canvas rendering uses a smaller cell size.
  - Grid lines remain visible but visually lighter.
  - Existing paint, motifs, and symmetry tools continue to work with no behavioral changes.
- Zoom behavior:
  - Include a zoom control with step presets (for example 50%, 75%, 100%, 150%, 200%).
  - Include quick controls (+ / - and reset to fit).
  - Keep pointer targeting accurate regardless of zoom level.
  - Preserve zoom level per browser session for continuity.
  - Maintain square cells at every zoom level (no non-uniform stretch).
- Preference should persist per browser (local storage), similar to remembered canvas size.

Proposed rollout:

1. Milestone A (Foundations): add toggle and responsive compact cell sizing.
2. Milestone B (Navigation): add zoom controls, fit behavior, and zoom state persistence.
3. Milestone C (Interaction): verify pointer accuracy in compact and zoomed modes.
4. Milestone D (Performance): confirm smooth rendering and painting at 128x128 across zoom levels.
5. Milestone E (Quality gate): add core/e2e/a11y coverage for toggle behavior, zoom behavior, and persistence.
6. Milestone F (Structure): land Map Art folders/modules and migrate related tests into scoped suites.

Acceptance targets:

- A 128x128 canvas is fully or nearly fully visible on common desktop viewports.
- No vertical page scroll is required for the primary drawing area in compact mode.
- Makers can quickly zoom in for detail edits and zoom out to evaluate full composition.
- Paint, motif load, symmetry paint, clear, and resize remain correct in both modes.
- Toggle state, zoom level, and canvas size restoration behave predictably across refresh.
- Cells remain square in all modes and across all supported zoom steps.

### Milestone 1 Scope Lock (Approved: 2026-07-04)

Purpose: ship Map Art foundations with minimum scope and strict budget control.

Must have:

- Map Art View toggle in primary controls.
- Viewport-fit calculation for large canvases (target: 128x128).
- Square-cell invariant enforced by one scalar cell size.
- Map Art View preference persisted per browser.
- Mandatory coverage for toggle behavior, fit behavior, square-cell invariant, and persistence.

Explicitly out for Milestone 1:

- Zoom controls and zoom presets.
- Performance optimization pass beyond normal acceptance.
- Palette redesign and motif-library expansion.
- Surface-type changes.

Acceptance gate:

- 128x128 is fully or nearly fully visible in Map Art View on common desktop viewport.
- No non-square cells are rendered in any supported state.
- Existing paint/symmetry/motif/clear/resize behavior remains correct.
- `npm run test` passes (core + e2e + WCAG AA check).

Execution rule:

- One implementation pass, one validation pass, one fix pass.
- Any non-essential polish is deferred to later milestones.

## Future

- Surface abstractions
- Curated palette bar (mix-and-match colors from any palette)
