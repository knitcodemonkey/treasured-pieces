# Contributing

Development workflow

1. Design first.
2. Implement one feature.
3. Test.
4. Review.
5. Approve.
6. Commit.

Every approved build becomes the new baseline.

Release workflow

- Follow `docs/release-process.md` for tagging and release publishing.
- Keep short notes in `CHANGELOG.md` and long-form notes in `docs/releases/vX.Y.Z.md`.

Accessibility workflow

- WCAG 2.2 AA is actively enforced in CI and treated as a required gate.
- WCAG 2.2 AAA is run in CI as an advisory audit to guide incremental improvements.
- Prefer small, user-centered accessibility improvements in every UI change (focus states, target size, labels, and contrast).
