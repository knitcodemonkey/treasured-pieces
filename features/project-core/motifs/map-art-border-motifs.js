// Dedicated oversized border motifs for map art canvases.
const MAP_ART_BORDER_MOTIFS = [
	{
		id: "mapart-border-circuit",
		name: "Circuit Frame",
		category: "border",
		placement: "border-repeat",
		description:
			"A high-contrast circuit frame with large traces and node clusters.",
		patternWidth: 16,
		patternHeight: 10,
		hasCornerCompanions: true,
		cornerCells: {
			topLeft: [
				{ dx: 0, dy: 0, colorId: "blue" },
				{ dx: 1, dy: 0, colorId: "blue" },
				{ dx: 2, dy: 0, colorId: "cyan" },
				{ dx: 0, dy: 1, colorId: "blue" },
				{ dx: 0, dy: 2, colorId: "blue" },
				{ dx: 1, dy: 1, colorId: "light_blue" },
				{ dx: 1, dy: 2, colorId: "white" }
			],
			topRight: [
				{ dx: 2, dy: 0, colorId: "cyan" },
				{ dx: 1, dy: 0, colorId: "blue" },
				{ dx: 0, dy: 0, colorId: "blue" },
				{ dx: 2, dy: 1, colorId: "blue" },
				{ dx: 2, dy: 2, colorId: "blue" },
				{ dx: 1, dy: 1, colorId: "light_blue" },
				{ dx: 1, dy: 2, colorId: "white" }
			],
			bottomLeft: [
				{ dx: 0, dy: 2, colorId: "blue" },
				{ dx: 1, dy: 2, colorId: "blue" },
				{ dx: 2, dy: 2, colorId: "cyan" },
				{ dx: 0, dy: 1, colorId: "blue" },
				{ dx: 0, dy: 0, colorId: "blue" },
				{ dx: 1, dy: 1, colorId: "light_blue" },
				{ dx: 1, dy: 0, colorId: "white" }
			],
			bottomRight: [
				{ dx: 2, dy: 2, colorId: "cyan" },
				{ dx: 1, dy: 2, colorId: "blue" },
				{ dx: 0, dy: 2, colorId: "blue" },
				{ dx: 2, dy: 1, colorId: "blue" },
				{ dx: 2, dy: 0, colorId: "blue" },
				{ dx: 1, dy: 1, colorId: "light_blue" },
				{ dx: 1, dy: 0, colorId: "white" }
			]
		},
		buildCells() {
			const cells = [];
			const addCell = (dx, dy, colorId) => {
				cells.push({ dx, dy, colorId });
			};

			const addHLine = (y, fromX, toX, colorId) => {
				for (let x = fromX; x <= toX; x += 1) {
					addCell(x, y, colorId);
				}
			};

			const addVLine = (x, fromY, toY, colorId) => {
				for (let y = fromY; y <= toY; y += 1) {
					addCell(x, y, colorId);
				}
			};

			addHLine(0, 0, 15, "blue");
			addHLine(1, 0, 15, "light_blue");
			addVLine(0, 0, 9, "blue");
			addVLine(15, 0, 9, "blue");

			addHLine(3, 2, 13, "cyan");
			addHLine(7, 2, 13, "cyan");

			for (const x of [3, 7, 11, 14]) {
				addVLine(x, 1, 6, "light_blue");
				addCell(x, 8, "white");
				addCell(Math.max(1, x - 1), 8, "cyan");
				addCell(Math.min(14, x + 1), 8, "cyan");
			}

			for (const startX of [2, 6, 10, 13]) {
				addCell(startX, 5, "blue");
				addCell(startX + 1, 5, "blue");
				addCell(startX, 6, "white");
				addCell(startX + 1, 6, "white");
			}

			for (const x of [4, 8, 12]) {
				addCell(x, 2, "white");
				addCell(x, 4, "white");
			}

			addCell(7, 2, "cyan");
			addCell(8, 2, "cyan");
			addCell(7, 8, "cyan");
			addCell(8, 8, "cyan");

			return cells;
		}
	},
	{
		id: "mapart-border-botanical",
		name: "Botanical Frame",
		category: "border",
		placement: "border-repeat",
		description:
			"A large botanical frame with readable vine arches and blossoms.",
		patternWidth: 16,
		patternHeight: 10,
		buildCells() {
			const cells = [];
			const addCell = (dx, dy, colorId) => {
				cells.push({ dx, dy, colorId });
			};

			for (let x = 0; x < 16; x += 1) {
				addCell(x, 0, "green");
				addCell(x, 1, x % 2 === 0 ? "lime" : "green");
			}

			for (let y = 0; y < 10; y += 1) {
				addCell(0, y, "green");
				addCell(15, y, "green");
			}

			for (const center of [3, 8, 13]) {
				addCell(center, 2, "lime");
				addCell(center - 1, 3, "green");
				addCell(center + 1, 3, "green");
				addCell(center - 2, 4, "lime");
				addCell(center + 2, 4, "lime");
				addCell(center, 4, "yellow");
				addCell(center - 1, 5, "pink");
				addCell(center + 1, 5, "pink");
				addCell(center, 6, "yellow");
				addCell(center, 7, "lime");
			}

			for (let x = 2; x < 14; x += 1) {
				if (x % 4 === 2) {
					addCell(x, 8, "lime");
					addCell(x + 1, 9, "yellow");
				}
			}

			addCell(7, 3, "white");
			addCell(8, 3, "white");
			addCell(7, 4, "pink");
			addCell(8, 4, "pink");
			return cells;
		}
	},
	{
		id: "mapart-border-celtic-knot",
		name: "Celtic Knot Frame",
		category: "border",
		placement: "border-repeat",
		description: "An interlaced knot frame with clearer over-under rhythm.",
		patternWidth: 16,
		patternHeight: 10,
		hasCornerCompanions: true,
		cornerCells: {
			topLeft: [
				{ dx: 0, dy: 0, colorId: "brown" },
				{ dx: 1, dy: 0, colorId: "brown" },
				{ dx: 0, dy: 1, colorId: "brown" },
				{ dx: 1, dy: 1, colorId: "light_gray" },
				{ dx: 2, dy: 1, colorId: "yellow" }
			],
			topRight: [
				{ dx: 1, dy: 0, colorId: "brown" },
				{ dx: 0, dy: 0, colorId: "brown" },
				{ dx: 1, dy: 1, colorId: "brown" },
				{ dx: 0, dy: 1, colorId: "light_gray" },
				{ dx: 1, dy: 2, colorId: "yellow" }
			],
			bottomLeft: [
				{ dx: 0, dy: 1, colorId: "brown" },
				{ dx: 1, dy: 1, colorId: "brown" },
				{ dx: 0, dy: 0, colorId: "brown" },
				{ dx: 1, dy: 0, colorId: "light_gray" },
				{ dx: 2, dy: 0, colorId: "yellow" }
			],
			bottomRight: [
				{ dx: 1, dy: 1, colorId: "brown" },
				{ dx: 0, dy: 1, colorId: "brown" },
				{ dx: 1, dy: 0, colorId: "brown" },
				{ dx: 0, dy: 0, colorId: "light_gray" },
				{ dx: 0, dy: 2, colorId: "yellow" }
			]
		},
		buildCells() {
			const cells = [];
			const addCell = (dx, dy, colorId) => {
				cells.push({ dx, dy, colorId });
			};

			for (let x = 0; x < 16; x += 1) {
				addCell(x, 0, "brown");
				addCell(x, 1, x % 3 === 1 ? "light_gray" : "brown");
			}

			for (let y = 0; y < 10; y += 1) {
				addCell(0, y, "brown");
				addCell(15, y, "brown");
			}

			const modules = [1, 6, 11];
			for (const startX of modules) {
				addCell(startX, 2, "yellow");
				addCell(startX + 1, 2, "brown");
				addCell(startX + 2, 3, "light_gray");
				addCell(startX + 3, 4, "yellow");
				addCell(startX + 2, 5, "brown");
				addCell(startX + 1, 6, "light_gray");
				addCell(startX, 7, "yellow");
				addCell(startX + 1, 8, "brown");
			}

			for (const x of [3, 8, 13]) {
				addCell(x, 4, "white");
				addCell(x - 1, 5, "light_gray");
			}

			return cells;
		}
	},
	{
		id: "mapart-border-kintsugi",
		name: "Kintsugi Frame",
		category: "border",
		placement: "border-repeat",
		description:
			"A kintsugi frame with broad crack lines and clear metallic seams.",
		patternWidth: 16,
		patternHeight: 10,
		hasCornerCompanions: true,
		cornerCells: {
			topLeft: [
				{ dx: 0, dy: 0, colorId: "gray" },
				{ dx: 1, dy: 0, colorId: "gray" },
				{ dx: 0, dy: 1, colorId: "gray" },
				{ dx: 1, dy: 1, colorId: "yellow" }
			],
			topRight: [
				{ dx: 1, dy: 0, colorId: "gray" },
				{ dx: 0, dy: 0, colorId: "gray" },
				{ dx: 1, dy: 1, colorId: "gray" },
				{ dx: 0, dy: 1, colorId: "yellow" }
			],
			bottomLeft: [
				{ dx: 0, dy: 1, colorId: "gray" },
				{ dx: 1, dy: 1, colorId: "gray" },
				{ dx: 0, dy: 0, colorId: "gray" },
				{ dx: 1, dy: 0, colorId: "yellow" }
			],
			bottomRight: [
				{ dx: 1, dy: 1, colorId: "gray" },
				{ dx: 0, dy: 1, colorId: "gray" },
				{ dx: 1, dy: 0, colorId: "gray" },
				{ dx: 0, dy: 0, colorId: "yellow" }
			]
		},
		buildCells() {
			const cells = [];
			const addCell = (dx, dy, colorId) => {
				cells.push({ dx, dy, colorId });
			};

			for (let x = 0; x < 16; x += 1) {
				addCell(x, 0, "gray");
				addCell(x, 1, "light_gray");
			}

			for (let y = 0; y < 10; y += 1) {
				addCell(0, y, "gray");
				addCell(15, y, "gray");
			}

			for (let x = 2; x < 14; x += 1) {
				if (x % 4 === 2) {
					addCell(x, 2, "yellow");
					addCell(x + 1, 3, "orange");
					addCell(x, 4, "yellow");
				}
			}

			for (let x = 3; x < 14; x += 1) {
				if (x % 5 === 3) {
					addCell(x, 6, "yellow");
					addCell(x + 1, 7, "orange");
					addCell(x, 8, "yellow");
				}
			}

			for (const x of [4, 8, 12]) {
				addCell(x, 3, "white");
				addCell(x, 7, "white");
			}
			return cells;
		}
	}
];

if (typeof window !== "undefined") {
	window.projectCoreMapArtBorderMotifs = {
		MAP_ART_BORDER_MOTIFS
	};
}

if (typeof module !== "undefined") {
	module.exports = {
		MAP_ART_BORDER_MOTIFS
	};
}
