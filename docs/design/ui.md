# UI

The interface should feel calm, welcoming, and secondary to the maker's work.

Prefer whitespace over borders.

## Planned: Map Art View

For large map-art canvases (especially 128x128), the interface should prioritize seeing the full composition before micro-detail edits.

Planned behavior:

- Provide a Map Art View toggle in the main controls.
- Reduce cell size in Map Art View so the full frame is visible with minimal or no scrolling.
- Preserve drawing interaction quality and visual clarity at smaller cell sizes.
- Allow quick switching back to normal cell size for fine-detail work.
- Add zoom controls for detail editing without changing map dimensions.
- Include quick actions for zoom in, zoom out, and reset-to-fit.
- Keep cursor-to-cell targeting precise at every zoom level.
- Keep every cell square at all times by using one shared scale value for both axes.
