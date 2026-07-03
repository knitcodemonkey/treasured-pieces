const assert = require("assert");
const { createProject, createSymmetryEngine } = require("./project-core");

function sortPoints(points) {
	return [...points].sort((a, b) => a.y - b.y || a.x - b.x);
}

const project = createProject({ cols: 19, rows: 15 });
assert.strictEqual(project.cols, 19);
assert.strictEqual(project.rows, 15);
assert.deepStrictEqual(project.grid[0][0], project.palette.colors[0].hex);
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

const notApplied = project.applyTemplate("missing-template");
assert.strictEqual(notApplied, false);

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
