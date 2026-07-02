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

const applied = project.applyTemplate(project.templates[0].id);
assert.strictEqual(applied, true);

const nonDefaultCells = project.grid
	.flat()
	.filter((color) => color !== project.palette.colors[0].hex);
assert.ok(nonDefaultCells.length > 0);

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
