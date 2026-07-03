# Changelog

## Unreleased

## v6.1.8

- Fixed app version display to reflect the deployed page version, not remote latest-release lookups.
- Added release workflow guardrails requiring tag/version parity across package.json and index.html.
- Hardened Pages deployment workflow with automatic retry for transient GitHub Pages deployment failures.

## v6.1.7

- Replaced the simple clock-hourglass motif with a more ornate "Astral Clockwork" centerpiece.
- Expanded the clock motif structure with vaulted crown details, jewel spokes, and pendulum styling.
- Kept compatibility with variable-width panel workflows by preserving centered placement behavior.

## v6.1.6

- Rebalanced motif color usage to reduce warm-color dominance across the library.
- Updated several existing single and border motifs with cooler and neutral palettes.
- Added new single motifs with cyan, blue, purple, magenta, green, and lime emphasis.
- Added new border motifs with night-sky and ruby-chain color families.
- Ensured all palette colors are now represented across motif definitions.

## v6.1.5

- Added variable canvas width and height controls in the top toolbar.
- Added resize action that updates canvas dimensions and refreshes motif previews.
- Added project-level resize support in core with template library regeneration.
- Added core tests for resize behavior and invalid-dimension guards.
- Added end-to-end resize coverage for non-default canvas dimensions.

## v6.1.4

- Split motif definitions into dedicated motif modules under `features/project-core/motifs/`.
- Added category-based motif files for centered motifs and border motifs.
- Added multiple new centered motifs and border designs (including corner-companion border sets).
- Added visual corner badges and improved border motif metadata in the motifs modal.
- Kept grid overlay always visible by default while the grid checkbox remains hidden.

## v6.1.3

- Hid the Grid Overlay control from the top toolbar.
- Set grid visibility default to off for a cleaner startup canvas.
- Tightened symmetry label/dropdown spacing to avoid visual ambiguity.
- Reorganized toolbar into feature and destructive action groups.
- Reordered and aligned controls: Motifs then Symmetry on the left, Clear on the right.

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
