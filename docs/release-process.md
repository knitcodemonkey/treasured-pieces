# Release Process

Design
→ Implement
→ Review
→ Approved
→ New Baseline
→ Commit

Never build from an unapproved version.

Release notes policy:

- Keep concise release bullets in `CHANGELOG.md`.
- Keep long-form release writeups in `docs/releases/` with one file per tag (`vX.Y.Z.md`).
- Use GitHub Releases for public release publishing, sourced from changelog and/or `docs/releases/`.

GitHub automation:

- The release workflow reads `docs/releases/<tag>.md` when available and uses it as the GitHub Release body.
- The release workflow fails if `docs/releases/<tag>.md` is missing.
- The release workflow fails if the release notes file does not include `## Accessibility Compliance`.

Release execution checklist:

1. Finalize the approved code and docs changes on `main`.
2. Update `CHANGELOG.md` with the release section.
3. Create or update `docs/releases/vX.Y.Z.md`.
4. Include `## Accessibility Compliance` and record the release's compliance status.
5. Commit release changes to `main`.
6. Create and push tag `vX.Y.Z`.
7. Verify the Create Release workflow completed successfully.
8. Verify the GitHub Release body matches `docs/releases/vX.Y.Z.md`.

Validation command:

- `npm run test:core`
- `npm run test:e2e`
- `npm run test:a11y:aa`
- `npm run test:a11y:aaa`
