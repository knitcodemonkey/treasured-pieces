// Dedicated oversized border motifs for map art canvases.
const MAP_ART_BORDER_MOTIFS = [
	{
		id: "mapart-border-circuit",
		name: "Circuit Frame",
		category: "border",
		placement: "border-repeat",
		description: "A clean, large circuit frame with bold traces and sockets.",
		patternWidth: 20,
		patternHeight: 8,
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

			for (let x = 0; x < 20; x += 1) {
				cells.push({ dx: x, dy: 0, colorId: "blue" });
				cells.push({ dx: x, dy: 1, colorId: "light_blue" });
				if (x % 5 === 0) {
					cells.push({ dx: x, dy: 2, colorId: "cyan" });
					cells.push({ dx: x, dy: 4, colorId: "white" });
					cells.push({ dx: x, dy: 6, colorId: "cyan" });
				}
			}

			for (let y = 0; y < 8; y += 1) {
				cells.push({ dx: 0, dy: y, colorId: "blue" });
				cells.push({ dx: 19, dy: y, colorId: "blue" });
			}

			for (let x = 2; x < 18; x += 1) {
				if (x % 4 === 2) {
					cells.push({ dx: x, dy: 3, colorId: "cyan" });
					cells.push({ dx: x + 1, dy: 3, colorId: "cyan" });
					cells.push({ dx: x, dy: 5, colorId: "light_blue" });
					cells.push({ dx: x + 1, dy: 5, colorId: "light_blue" });
				}
			}

			cells.push({ dx: 9, dy: 2, colorId: "white" });
			cells.push({ dx: 10, dy: 2, colorId: "white" });
			return cells;
		}
	},
	{
		id: "mapart-border-botanical",
		name: "Botanical Frame",
		category: "border",
		placement: "border-repeat",
		description: "A cleaner botanical frame with larger vine arcs and blooms.",
		patternWidth: 18,
		patternHeight: 8,
		buildCells() {
			const cells = [];
			for (let x = 0; x < 18; x += 1) {
				cells.push({ dx: x, dy: 0, colorId: "green" });
				if (x % 3 !== 1) {
					cells.push({ dx: x, dy: 1, colorId: "lime" });
				}
				if (x % 6 === 0) {
					cells.push({ dx: x, dy: 2, colorId: "yellow" });
					cells.push({ dx: x, dy: 3, colorId: "pink" });
					cells.push({ dx: x, dy: 4, colorId: "yellow" });
				}
			}

			for (let y = 0; y < 8; y += 1) {
				if (y <= 2 || y >= 5) {
					cells.push({ dx: 0, dy: y, colorId: "green" });
					cells.push({ dx: 17, dy: y, colorId: "green" });
				}
			}

			for (let x = 2; x < 16; x += 1) {
				if (x % 5 === 2) {
					cells.push({ dx: x, dy: 5, colorId: "lime" });
					cells.push({ dx: x + 1, dy: 6, colorId: "yellow" });
					cells.push({ dx: x, dy: 7, colorId: "lime" });
				}
			}

			cells.push({ dx: 8, dy: 3, colorId: "white" });
			cells.push({ dx: 9, dy: 3, colorId: "white" });
			cells.push({ dx: 8, dy: 4, colorId: "pink" });
			cells.push({ dx: 9, dy: 4, colorId: "pink" });
			return cells;
		}
	},
	{
		id: "mapart-border-celtic-knot",
		name: "Celtic Knot Frame",
		category: "border",
		placement: "border-repeat",
		description: "A cleaner interlaced knot border with larger readable loops.",
		patternWidth: 16,
		patternHeight: 8,
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

			for (let x = 0; x < 16; x += 1) {
				cells.push({ dx: x, dy: 0, colorId: "brown" });
				if (x % 4 !== 1) {
					cells.push({ dx: x, dy: 1, colorId: "light_gray" });
				}
			}

			for (let y = 0; y < 8; y += 1) {
				cells.push({ dx: 0, dy: y, colorId: "brown" });
				cells.push({ dx: 15, dy: y, colorId: "brown" });
			}

			const loopColumns = [2, 3, 6, 7, 10, 11, 13, 14];
			for (const x of loopColumns) {
				const isHighlight = x % 4 === 2;
				cells.push({ dx: x, dy: 2, colorId: isHighlight ? "yellow" : "brown" });
				cells.push({ dx: x, dy: 5, colorId: isHighlight ? "yellow" : "brown" });
			}

			cells.push({ dx: 4, dy: 3, colorId: "light_gray" });
			cells.push({ dx: 5, dy: 4, colorId: "white" });
			cells.push({ dx: 8, dy: 3, colorId: "light_gray" });
			cells.push({ dx: 9, dy: 4, colorId: "white" });
			cells.push({ dx: 12, dy: 3, colorId: "light_gray" });

			return cells;
		}
	},
	{
		id: "mapart-border-kintsugi",
		name: "Kintsugi Frame",
		category: "border",
		placement: "border-repeat",
		description: "A cleaner kintsugi frame with broad fracture seams.",
		patternWidth: 20,
		patternHeight: 8,
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
			for (let x = 0; x < 20; x += 1) {
				cells.push({ dx: x, dy: 0, colorId: "gray" });
				cells.push({ dx: x, dy: 1, colorId: "light_gray" });
				if (x % 3 === 0) {
					cells.push({ dx: x, dy: 2, colorId: "yellow" });
				}
				if (x % 5 === 0) {
					cells.push({ dx: x, dy: 4, colorId: "orange" });
				}
				if (x % 4 === 1) {
					cells.push({ dx: x, dy: 6, colorId: "yellow" });
					cells.push({ dx: x + 1 < 20 ? x + 1 : x, dy: 6, colorId: "yellow" });
				}
			}

			for (let y = 0; y < 8; y += 1) {
				cells.push({ dx: 0, dy: y, colorId: "gray" });
				cells.push({ dx: 19, dy: y, colorId: "gray" });
			}

			for (let x = 2; x < 18; x += 1) {
				if (x % 6 === 2) {
					cells.push({ dx: x, dy: 3, colorId: "white" });
					cells.push({ dx: x + 1, dy: 5, colorId: "orange" });
					cells.push({ dx: x, dy: 7, colorId: "white" });
				}
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
