const assert = require("assert");
const { createProject, createSymmetryEngine } = require("./project-core");

function sortPoints(points) {
	return [...points].sort((a, b) => a.y - b.y || a.x - b.x);
}

const project = createProject({ cols: 19, rows: 15 });
assert.strictEqual(project.cols, 19);
assert.strictEqual(project.rows, 15);
assert.deepStrictEqual(project.grid[0][0], project.palette.colors[0].hex);
assert.strictEqual(
	project.palette.colors[0].id,
	"clear",
	"Clear should be the default palette option"
);
assert.ok(
	project.palette.colors.some((entry) => entry.id === "white"),
	"White should still be available as a paint option"
);
assert.ok(project.templates.length > 0);
assert.ok(project.templates.some((template) => template.id === "sun"));
assert.ok(project.templates.some((template) => template.id === "moon"));
assert.ok(project.templates.some((template) => template.id === "compass"));
assert.ok(project.templates.some((template) => template.id === "flower"));
assert.ok(project.templates.some((template) => template.id === "deco"));
assert.ok(project.templates.some((template) => template.id === "deco-fan"));
assert.ok(project.templates.some((template) => template.id === "deco-pillars"));
assert.ok(
	project.templates.some((template) => template.id === "star-medallion")
);
assert.ok(project.templates.some((template) => template.id === "lotus-bloom"));
assert.ok(project.templates.some((template) => template.id === "hearth-knot"));
assert.ok(project.templates.some((template) => template.id === "wind-rose"));
assert.ok(
	project.templates.some((template) => template.id === "tarot-sun-arcana")
);
assert.ok(
	project.templates.some((template) => template.id === "tarot-moon-arcana")
);
assert.ok(
	project.templates.some((template) => template.id === "tarot-star-arcana")
);
assert.ok(
	project.templates.some((template) => template.id === "tarot-wheel-arcana")
);
assert.ok(
	project.templates.some((template) => template.id === "kintsugi-gold-seams")
);
assert.ok(
	project.templates.some((template) => template.id === "lotus-habitat-bloom")
);
assert.ok(
	project.templates.some((template) => template.id === "inner-gears-clockwork")
);
assert.ok(
	project.templates.some(
		(template) => template.id === "full-window-kintsugi-sanctuary"
	)
);
assert.ok(
	project.templates.some((template) => template.id === "full-window-sun-arcana")
);
assert.ok(
	project.templates.some(
		(template) => template.id === "full-window-moon-arcana"
	)
);
assert.ok(
	project.templates.some(
		(template) => template.id === "full-window-wheel-of-fortune"
	)
);
assert.ok(project.templates.some((template) => template.id === "border-beads"));
assert.ok(project.templates.some((template) => template.id === "border-steps"));
assert.ok(
	project.templates.some((template) => template.id === "border-celtic-knot")
);
assert.ok(
	project.templates.some((template) => template.id === "border-diamonds")
);
assert.ok(project.templates.some((template) => template.id === "border-vine"));
assert.ok(project.templates.some((template) => template.id === "border-rope"));
assert.ok(project.templates.some((template) => template.category === "border"));

const applied = project.applyTemplate(project.templates[0].id);
assert.strictEqual(applied, true);

const nonDefaultCells = project.grid
	.flat()
	.filter((color) => color !== project.palette.colors[0].hex);
assert.ok(nonDefaultCells.length > 0);

const borderApplied = project.applyTemplate("border-beads");
assert.strictEqual(borderApplied, true);
const defaultColor = project.palette.colors[0].hex;
const topEdgePainted = project.grid[0].some((color) => color !== defaultColor);
const bottomEdgePainted = project.grid[project.rows - 1].some(
	(color) => color !== defaultColor
);
const leftEdgePainted = project.grid.some((row) => row[0] !== defaultColor);
const rightEdgePainted = project.grid.some(
	(row) => row[project.cols - 1] !== defaultColor
);

assert.strictEqual(topEdgePainted, true, "Border motif should paint top edge");
assert.strictEqual(
	bottomEdgePainted,
	true,
	"Border motif should paint bottom edge"
);
assert.strictEqual(
	leftEdgePainted,
	true,
	"Border motif should paint left edge"
);
assert.strictEqual(
	rightEdgePainted,
	true,
	"Border motif should paint right edge"
);

const topRowPaintedColumns = project.grid[0]
	.map((color, index) => ({ color, index }))
	.filter((entry) => entry.color !== defaultColor)
	.map((entry) => entry.index);
assert.ok(
	topRowPaintedColumns.length > 0,
	"Expected border motif to paint at least one top-edge column"
);
assert.strictEqual(
	topRowPaintedColumns[0],
	0,
	"Border repeat phase should be centered so top motif starts flush when clipped"
);
assert.strictEqual(
	topRowPaintedColumns[topRowPaintedColumns.length - 1],
	project.cols - 1,
	"Border repeat phase should be centered so top motif ends flush when clipped"
);

const celticApplied = project.applyTemplate("border-celtic-knot");
assert.strictEqual(celticApplied, true);
assert.notStrictEqual(
	project.grid[0][0],
	defaultColor,
	"Celtic border corner companion should paint top-left corner"
);
assert.notStrictEqual(
	project.grid[0][project.cols - 1],
	defaultColor,
	"Celtic border corner companion should paint top-right corner"
);
assert.notStrictEqual(
	project.grid[project.rows - 1][0],
	defaultColor,
	"Celtic border corner companion should paint bottom-left corner"
);
assert.notStrictEqual(
	project.grid[project.rows - 1][project.cols - 1],
	defaultColor,
	"Celtic border corner companion should paint bottom-right corner"
);

const ropeApplied = project.applyTemplate("border-rope");
assert.strictEqual(ropeApplied, true);
assert.notStrictEqual(
	project.grid[0][0],
	defaultColor,
	"Rope border should include companion corner paint"
);

const tallProject = createProject({ cols: 19, rows: 26 });
const tallApplied = tallProject.applyTemplate("full-window-moon-arcana");
assert.strictEqual(tallApplied, true);
const lightGrayHex = tallProject.palette.colors.find(
	(color) => color.id === "light_gray"
)?.hex;
const grayHex = tallProject.palette.colors.find(
	(color) => color.id === "gray"
)?.hex;
assert.strictEqual(
	tallProject.grid[0][0],
	lightGrayHex,
	"Full-window motifs should reach the top-left border on a 19x26 canvas"
);
assert.strictEqual(
	tallProject.grid[tallProject.rows - 1][tallProject.cols - 1],
	lightGrayHex,
	"Full-window motifs should reach the bottom-right border on a 19x26 canvas"
);
assert.notStrictEqual(
	tallProject.grid[1][1],
	lightGrayHex,
	"Full-window motif border should only be one cell wide"
);
assert.notStrictEqual(
	tallProject.grid[1][1],
	grayHex,
	"Full-window motif should not add a second gray border band inside the border"
);

const notApplied = project.applyTemplate("missing-template");
assert.strictEqual(notApplied, false);

project.grid[0][0] = project.palette.colors[5].hex;
const resized = project.resize(12, 10);
assert.strictEqual(resized, true);
assert.strictEqual(project.cols, 12);
assert.strictEqual(project.rows, 10);
assert.strictEqual(project.grid.length, 10);
assert.strictEqual(project.grid[0].length, 12);
assert.strictEqual(
	project.grid[0][0],
	project.palette.colors[5].hex,
	"Resize should preserve existing painted cells by default"
);
assert.ok(
	project.templates.some((template) => template.id === "sun"),
	"Templates should be rebuilt after resize"
);

const invalidResize = project.resize(0, 10);
assert.strictEqual(invalidResize, false);
assert.strictEqual(project.cols, 12);
assert.strictEqual(project.rows, 10);

const engine = createSymmetryEngine({ cols: 19, rows: 15 });
assert.deepStrictEqual(engine.getPoints(0, 0, "None"), [{ x: 0, y: 0 }]);
assert.deepStrictEqual(engine.getPoints(0, 0, "Quad"), [
	{ x: 0, y: 0 },
	{ x: 18, y: 0 },
	{ x: 0, y: 14 },
	{ x: 18, y: 14 }
]);
assert.deepStrictEqual(
	sortPoints(engine.getPoints(8, 6, "4-Way Radial")),
	sortPoints([
		{ x: 8, y: 6 },
		{ x: 8, y: 8 },
		{ x: 10, y: 8 },
		{ x: 10, y: 6 }
	])
);
assert.deepStrictEqual(engine.getPoints(5, 3, "180°"), [
	{ x: 5, y: 3 },
	{ x: 13, y: 11 }
]);
const eightWayPoints = engine.getPoints(8, 6, "8-Way Radial");
assert.strictEqual(eightWayPoints.length, 8);

console.log("project-core tests passed");
