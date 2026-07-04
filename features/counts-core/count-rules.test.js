const assert = require("assert");
const { createColorUsageSnapshot } = require("./count-rules");

const project = {
	cols: 2,
	rows: 2,
	palette: {
		colors: [
			{ id: "clear", name: "Clear", hex: "#F9FFFE" },
			{ id: "black", name: "Black", hex: "#1D1D21" },
			{ id: "red", name: "Red", hex: "#B02E26" }
		]
	},
	grid: [
		["#1D1D21", "#1D1D21"],
		["#B02E26", "#F9FFFE"]
	]
};

const normalSnapshot = createColorUsageSnapshot({ project });
assert.strictEqual(normalSnapshot.totalCells, 4);
assert.strictEqual(normalSnapshot.coloredCount, 3);
assert.strictEqual(normalSnapshot.entries.length, 3);
assert.strictEqual(normalSnapshot.entries[0].id, "black");
assert.strictEqual(normalSnapshot.entries[0].count, 2);
assert.strictEqual(normalSnapshot.entries[1].id, "clear");
assert.strictEqual(normalSnapshot.entries[1].count, 1);
assert.strictEqual(normalSnapshot.entries[2].id, "red");
assert.strictEqual(normalSnapshot.entries[2].count, 1);

const mapSnapshot = createColorUsageSnapshot({
	project,
	excludedHex: "#1D1D21"
});
assert.strictEqual(mapSnapshot.totalCells, 4);
assert.strictEqual(mapSnapshot.coloredCount, 2);
assert.strictEqual(mapSnapshot.entries.length, 2);
assert.strictEqual(mapSnapshot.entries[0].id, "clear");
assert.strictEqual(mapSnapshot.entries[0].count, 1);
assert.strictEqual(mapSnapshot.entries[1].id, "red");
assert.strictEqual(mapSnapshot.entries[1].count, 1);

console.log("count-rules tests passed");
