// Dedicated oversized border motifs for map art canvases.
const MAP_ART_BORDER_MOTIFS = [
	{
		id: "mapart-border-circuit",
		name: "Circuit Frame",
		category: "border",
		placement: "border-repeat",
		description: "A large repeating circuit-like frame tile with corner caps.",
		patternWidth: 16,
		patternHeight: 6,
		hasCornerCompanions: true,
		cornerCells: {
			topLeft: [
				{ dx: 0, dy: 0, colorId: "light_blue" },
				{ dx: 1, dy: 0, colorId: "cyan" },
				{ dx: 2, dy: 0, colorId: "blue" },
				{ dx: 0, dy: 1, colorId: "cyan" },
				{ dx: 0, dy: 2, colorId: "blue" },
				{ dx: 1, dy: 2, colorId: "white" }
			],
			topRight: [
				{ dx: 2, dy: 0, colorId: "light_blue" },
				{ dx: 1, dy: 0, colorId: "cyan" },
				{ dx: 0, dy: 0, colorId: "blue" },
				{ dx: 2, dy: 1, colorId: "cyan" },
				{ dx: 2, dy: 2, colorId: "blue" },
				{ dx: 1, dy: 2, colorId: "white" }
			],
			bottomLeft: [
				{ dx: 0, dy: 2, colorId: "light_blue" },
				{ dx: 1, dy: 2, colorId: "cyan" },
				{ dx: 2, dy: 2, colorId: "blue" },
				{ dx: 0, dy: 1, colorId: "cyan" },
				{ dx: 0, dy: 0, colorId: "blue" },
				{ dx: 1, dy: 0, colorId: "white" }
			],
			bottomRight: [
				{ dx: 2, dy: 2, colorId: "light_blue" },
				{ dx: 1, dy: 2, colorId: "cyan" },
				{ dx: 0, dy: 2, colorId: "blue" },
				{ dx: 2, dy: 1, colorId: "cyan" },
				{ dx: 2, dy: 0, colorId: "blue" },
				{ dx: 1, dy: 0, colorId: "white" }
			]
		},
		buildCells() {
			const cells = [];
			for (let x = 0; x < 16; x += 1) {
				cells.push({ dx: x, dy: 0, colorId: x % 2 === 0 ? "blue" : "cyan" });
				if (x % 4 === 0) {
					cells.push({ dx: x, dy: 1, colorId: "light_blue" });
					cells.push({ dx: x, dy: 3, colorId: "white" });
					cells.push({ dx: x, dy: 5, colorId: "light_blue" });
				}
			}

			for (let y = 0; y < 6; y += 1) {
				cells.push({ dx: 0, dy: y, colorId: "blue" });
				cells.push({ dx: 15, dy: y, colorId: "blue" });
			}

			for (let x = 2; x < 14; x += 1) {
				if (x % 3 === 0) {
					cells.push({ dx: x, dy: 2, colorId: "cyan" });
					cells.push({ dx: x, dy: 4, colorId: "cyan" });
				}
			}
			return cells;
		}
	},
	{
		id: "mapart-border-botanical",
		name: "Botanical Frame",
		category: "border",
		placement: "border-repeat",
		description: "A larger vine-and-bloom border repeat for broad canvases.",
		patternWidth: 14,
		patternHeight: 7,
		buildCells() {
			const cells = [];
			for (let x = 0; x < 14; x += 1) {
				cells.push({ dx: x, dy: 0, colorId: "green" });
				if (x % 2 === 0) {
					cells.push({ dx: x, dy: 1, colorId: "lime" });
				}
				if (x % 5 === 0) {
					cells.push({ dx: x, dy: 2, colorId: "yellow" });
					cells.push({ dx: x, dy: 3, colorId: "pink" });
				}
			}

			for (let y = 0; y < 7; y += 1) {
				if (y % 2 === 0) {
					cells.push({ dx: 0, dy: y, colorId: "green" });
					cells.push({ dx: 13, dy: y, colorId: "green" });
				}
			}

			for (let x = 1; x < 13; x += 1) {
				if (x % 4 === 1) {
					cells.push({ dx: x, dy: 5, colorId: "lime" });
					cells.push({ dx: x, dy: 6, colorId: "yellow" });
				}
			}
			return cells;
		}
	},
	{
		id: "mapart-border-kintsugi",
		name: "Kintsugi Frame",
		category: "border",
		placement: "border-repeat",
		description: "A bold fractured-gold frame built for map art scale.",
		patternWidth: 18,
		patternHeight: 8,
		hasCornerCompanions: true,
		cornerCells: {
			topLeft: [
				{ dx: 0, dy: 0, colorId: "yellow" },
				{ dx: 1, dy: 0, colorId: "orange" },
				{ dx: 0, dy: 1, colorId: "orange" },
				{ dx: 1, dy: 1, colorId: "white" }
			],
			topRight: [
				{ dx: 1, dy: 0, colorId: "yellow" },
				{ dx: 0, dy: 0, colorId: "orange" },
				{ dx: 1, dy: 1, colorId: "orange" },
				{ dx: 0, dy: 1, colorId: "white" }
			],
			bottomLeft: [
				{ dx: 0, dy: 1, colorId: "yellow" },
				{ dx: 1, dy: 1, colorId: "orange" },
				{ dx: 0, dy: 0, colorId: "orange" },
				{ dx: 1, dy: 0, colorId: "white" }
			],
			bottomRight: [
				{ dx: 1, dy: 1, colorId: "yellow" },
				{ dx: 0, dy: 1, colorId: "orange" },
				{ dx: 1, dy: 0, colorId: "orange" },
				{ dx: 0, dy: 0, colorId: "white" }
			]
		},
		buildCells() {
			const cells = [];
			for (let x = 0; x < 18; x += 1) {
				cells.push({ dx: x, dy: 0, colorId: "gray" });
				cells.push({ dx: x, dy: 1, colorId: "light_gray" });
				if (x % 2 === 0) {
					cells.push({ dx: x, dy: 2, colorId: "yellow" });
				}
				if (x % 3 === 0) {
					cells.push({ dx: x, dy: 4, colorId: "orange" });
				}
				if (x % 4 === 0) {
					cells.push({ dx: x, dy: 6, colorId: "yellow" });
				}
			}

			for (let y = 0; y < 8; y += 1) {
				cells.push({ dx: 0, dy: y, colorId: "gray" });
				cells.push({ dx: 17, dy: y, colorId: "gray" });
			}

			for (let x = 1; x < 17; x += 1) {
				if (x % 5 === 0) {
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
