# Feature Handling Standard

This standard defines how features are structured, owned, tested, and released so the codebase stays easy to delete, replace, and maintain.

## Goals

- Keep feature code predictable and replaceable.
- Keep shared behavior centralized and stable.
- Prevent branching complexity from spreading across unrelated modules.
- Make every feature change verifiable through mandatory tests.

## Feature Shape

Each feature should follow the same high-level shape:

- `features/<feature>-core/`
- `features/<feature>-ui/`
- `features/<feature>-e2e/`

A feature may start in existing shared modules, but once it introduces distinct behavior, it should be extracted into this shape.

## Ownership Rules

- Shared modules own shared behavior and app shell responsibilities.
- Feature core owns feature-specific rules, state contracts, and invariants.
- Feature UI owns feature controls, labels, interactions, and visual behavior.
- Feature E2E owns feature-specific user flows and regressions.
- Feature code should not duplicate shared primitives if those primitives are stable and generic.

## Extraction Triggers

Extract into independent feature scope when one or more are true:

- The feature has unique defaults or invariants.
- The feature has unique persistence rules.
- The feature requires a dedicated test matrix.
- The same mode-specific branch appears repeatedly in shared code.
- Feature changes increase risk for unrelated workflows.

## State and Persistence Pattern

- Keep feature state behind a small adapter API.
- Avoid direct storage reads/writes spread throughout UI code.
- Persist only what the feature contract requires.
- Do not let one mode overwrite preferences belonging to another mode unless explicitly intended.

## Test Gate Requirements

Every feature change must include:

- Core tests for logic and invariants.
- E2E tests for behavior contracts.
- Accessibility checks included in the default test gate.

No feature is complete unless `npm run test` passes with updated coverage.

## Release and Scope Control

Before implementation:

- Define must-have behavior.
- Define explicit out-of-scope items.
- Define acceptance criteria.
- Define budget/scope control rules.

During implementation:

- Prefer one focused implementation pass.
- Follow with one validation pass.
- Use one targeted fix pass if required.
- Defer non-essential polish to later milestones.

## Map Art Pilot

Map Art is the pilot feature for this standard.

Pilot expectations:

- Keep map-specific behavior inside map feature modules as extraction proceeds.
- Keep shared paint/symmetry primitives in shared modules.
- Keep mode contracts explicit (size, background, counts, persistence).

## Consistency Checklist

Use this checklist for each new feature or major feature revision:

- Feature shape follows core/ui/e2e structure.
- Ownership boundaries are documented.
- Persistence behavior is intentional and tested.
- Invariants are enforced and tested.
- Accessibility is included in default validation.
- Release notes describe behavior contracts, not only implementation details.
