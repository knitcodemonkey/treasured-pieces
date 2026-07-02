const assert = require("assert");
const { createProject, createSymmetryEngine } = require("../js/project");

const project = createProject({ cols: 19, rows: 15 });
assert.strictEqual(project.cols, 19);
assert.strictEqual(project.rows, 15);
assert.deepStrictEqual(project.grid[0][0], project.palette.colors[0].hex);

const engine = createSymmetryEngine({ cols: 19, rows: 15 });
assert.deepStrictEqual(engine.getPoints(0, 0, "None"), [{ x: 0, y: 0 }]);
assert.deepStrictEqual(engine.getPoints(0, 0, "Quad"), [
	{ x: 0, y: 0 },
	{ x: 18, y: 0 },
	{ x: 0, y: 14 },
	{ x: 18, y: 14 }
]);
assert.deepStrictEqual(engine.getPoints(8, 6, "4-Way Radial"), [
	{ x: 8, y: 6 },
	{ x: 8, y: 8 },
	{ x: 10, y: 8 },
	{ x: 10, y: 6 }
]);
assert.deepStrictEqual(engine.getPoints(5, 3, "180°"), [
	{ x: 5, y: 3 },
	{ x: 13, y: 11 }
]);
const eightWayPoints = engine.getPoints(8, 6, "8-Way Radial");
assert.strictEqual(eightWayPoints.length, 8);

console.log("project tests passed");
