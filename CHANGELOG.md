# Changelog

## Unreleased

## v6.1.2

- Replaced tabbed Motifs panel with a dedicated Motifs modal.
- Kept Symmetry selection permanently visible in the top bar.
- Added modal open/close behavior including backdrop and Escape handling.
- Removed the Blank motif option from the motif picker.
- Redesigned the Moon motif with a cleaner crescent-and-stars look.
- Updated end-to-end tests for the modal motifs workflow.

## v6.1.1

- Simplified top toolbar by keeping Grid and Clear always visible.
- Reduced mode switching by keeping only Symmetry and Motifs feature tabs.
- Stabilized control area height to avoid page movement when switching features.
- Removed palette side-scroll and tuned swatch sizing so 16 colors fit in one row on iPad.
- Added roadmap language for curated palette bar planning.

## v6.1.0

- Replaced motif dropdown flow with a visual motif picker using mini previews and names.
- Merged motif selection and loading into a single tap interaction.
- Simplified toolbar UX with feature tab panels (Canvas, Symmetry, Motifs).
- Renamed user-facing motif terminology for clearer maker-focused language.
- Updated end-to-end tests to match tabbed controls and visual motif selection.

## v6.0.1

- Improved iPad mini and Apple Pencil ergonomics for toolbar and palette interaction.
- Added Pencil-focused drawing improvements with smoother continuous stroke interpolation.
- Added a Pencil double-tap gesture on canvas to toggle between active color and white erase.
- Removed native browser swatch tooltip duplication on iPad hover.
- Repositioned custom swatch tooltips above colors with edge-aware fallback below.

## v6.0.0

- Moved to feature-sliced architecture with co-located code and tests.
- Cut over to native feature entry points (removed legacy root JS/CSS paths).
- Added user-flow end-to-end suite under `features/studio-e2e/`.
- Added deterministic local tooling via `package.json` and pinned dev dependencies.
- Added CI workflow for studio user-flow E2E tests.
- Updated accessibility audit script compatibility and kept WCAG 2.2 checks active.

## v5.4.3

- Added starter template library for canvas kickoffs
- Added toolbar template picker with apply action
- Added template descriptions and live toolbar template hint text
- Expanded art deco templates with diamond, fan, and pillar variants
- Documented transform-based symmetry as implemented
- Documented 180° rotational symmetry as implemented
- Documented 4-way and 8-way radial symmetry as implemented
- Synced README feature status and roadmap milestones
- Set current focus to variable canvas sizes and next to non-destructive resize

## v5.1.0-alpha2d

- Treasured Pieces branding
- Workbench layout
- Palette object
- Custom color tooltips
- Improved spacing
