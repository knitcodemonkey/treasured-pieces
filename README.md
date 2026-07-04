# Treasured Pieces

> _I know you've been saving something beautiful. Let's find what it wants to become._

🌐 **Live Demo**

[https://knitcodemonkey.github.io/treasured-pieces/](https://knitcodemonkey.github.io/treasured-pieces/)

---

Treasured Pieces is a creative pattern design studio for makers.

Originally inspired by Minecraft stained glass, it is being designed as a craft-agnostic tool for exploring symmetry, color, and pattern across many creative disciplines—including stained glass, quilting, cross stitch, mosaics, beadwork, and more.

Our philosophy is simple:

> **Beautiful treasures deserve to become beautiful works.**

Guiding symbols in our design language:

- Kintsugi (repair as strength)
- Lotus (growth through difficulty)
- Stained glass (light from within)
- Wheel/Clock (cycles, timing, and renewal)

---

## Current Status

Treasured Pieces is currently in active development.

**Current baseline:** `v7.2.7`

Recent improvements include:

- Workbench-inspired interface
- Named palettes with custom tooltips
- Centered coordinate system
- Transform-based symmetry engine
- 180° rotational symmetry
- 4-way and 8-way radial symmetry

---

## Features

### Current

- Paint-by-cell editor
- Multiple symmetry modes
- Palette selection
- Starter template library
- Grid overlay
- Clear canvas
- Variable canvas sizes

### Planned

- Non-destructive canvas resizing
- Multiple palettes
- Project save/load
- Multiple surface types (square, hex, triangle)

---

## Philosophy

Treasured Pieces is built around three core ideas:

- Beautiful treasures deserve to become beautiful works.
- Treasured pieces deserve to become treasured pieces.
- The software should adapt to the maker—not the other way around.

To learn more about the project's vision and design philosophy, see:

- `docs/vision.md`
- `docs/philosophy.md`

---

## Documentation

Additional documentation is available in the `docs` directory.

- **Vision** — Why Treasured Pieces exists
- **Philosophy** — Design principles
- **Roadmap** — Planned features and milestones
- **Feature Handling Standard** — Consistent feature structure, ownership, and validation rules
- **Release Notes** — Long-form release writeups (`docs/releases`)
- **Architecture** — Project structure
- **Design Notes** — UI, palettes, symmetry, and surfaces
- **Architecture Decision Records (ADRs)** — Why key technical decisions were made

---

## Development

The codebase uses feature-sliced co-location for maintainability:

- `features/project-core/` contains project logic and tests.
- `features/studio-ui/` contains studio UI behavior and styles.
- `features/studio-e2e/` contains end-to-end user-flow tests.

Testing:

- Unit/core: `npm run test:core`
- User-flow E2E: `npm run test:e2e`

Every approved build becomes the new project baseline.

Development follows a small, iterative workflow:

```
Design
    ↓
Implement
    ↓
Review
    ↓
Approve
    ↓
Commit
```

The goal is that every approved build is stable, shippable, and a solid foundation for the next feature.

---

## License

_To be determined._
