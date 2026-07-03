// Generated from motif definitions split by category.
const SINGLE_MOTIFS = [
	{
		id: "sun",
		name: "Sun",
		category: "single",
		placement: "center",
		description: "A bright sun cross with warm orange accents.",
		buildCells() {
			const cells = [];
			for (let i = -4; i <= 4; i += 1) {
				cells.push({ dx: i, dy: 0, colorId: "yellow" });
				cells.push({ dx: 0, dy: i, colorId: "yellow" });
			}
			[
				[-3, -3],
				[3, -3],
				[-3, 3],
				[3, 3],
				[-2, -2],
				[2, -2],
				[-2, 2],
				[2, 2]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "orange" });
			});
			cells.push({ dx: 0, dy: 0, colorId: "white" });
			return cells;
		}
	},
	{
		id: "moon",
		name: "Moon",
		category: "single",
		placement: "center",
		description: "A crescent moon with a small star field accent.",
		buildCells() {
			const cells = [];

			const outerRadius = 5;
			const innerRadius = 4;
			const innerOffsetX = 2;

			for (let y = -outerRadius; y <= outerRadius; y += 1) {
				for (let x = -outerRadius; x <= outerRadius; x += 1) {
					const inOuter = x * x + y * y <= outerRadius * outerRadius;
					const innerX = x - innerOffsetX;
					const inInner = innerX * innerX + y * y <= innerRadius * innerRadius;

					if (inOuter && !inInner) {
						cells.push({ dx: x, dy: y, colorId: "white" });
					}
				}
			}

			[
				{ dx: 4, dy: -4, colorId: "yellow" },
				{ dx: 6, dy: -2, colorId: "light_blue" },
				{ dx: 5, dy: 1, colorId: "yellow" },
				{ dx: 7, dy: 2, colorId: "light_blue" },
				{ dx: 6, dy: 4, colorId: "yellow" }
			].forEach((star) => {
				cells.push(star);
			});

			return cells;
		}
	},
	{
		id: "compass",
		name: "Compass Rose",
		category: "single",
		placement: "center",
		description: "A compass rose with cool cardinal rays and cyan tips.",
		buildCells() {
			const cells = [];
			for (let i = -5; i <= 5; i += 1) {
				cells.push({ dx: i, dy: 0, colorId: "blue" });
				cells.push({ dx: 0, dy: i, colorId: "light_blue" });
			}
			[
				[-4, -4],
				[4, -4],
				[-4, 4],
				[4, 4],
				[-3, -3],
				[3, -3],
				[-3, 3],
				[3, 3]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "cyan" });
			});
			cells.push({ dx: 0, dy: 0, colorId: "white" });
			return cells;
		}
	},
	{
		id: "flower",
		name: "Flower",
		category: "single",
		placement: "center",
		description: "A simple flower medallion with a gold center.",
		cells: [
			{ dx: 0, dy: 0, colorId: "yellow" },
			{ dx: 0, dy: -2, colorId: "purple" },
			{ dx: 0, dy: 2, colorId: "purple" },
			{ dx: -2, dy: 0, colorId: "purple" },
			{ dx: 2, dy: 0, colorId: "purple" },
			{ dx: -1, dy: -1, colorId: "purple" },
			{ dx: 1, dy: -1, colorId: "purple" },
			{ dx: -1, dy: 1, colorId: "purple" },
			{ dx: 1, dy: 1, colorId: "purple" }
		]
	},
	{
		id: "deco",
		name: "Art Deco Diamond",
		category: "single",
		placement: "center",
		description: "A layered diamond motif with cool jewel-tone rings.",
		buildCells() {
			const cells = [];
			const rings = [
				{ radius: 4, colorId: "gray" },
				{ radius: 3, colorId: "purple" },
				{ radius: 2, colorId: "cyan" },
				{ radius: 1, colorId: "white" }
			];

			for (const ring of rings) {
				for (let y = -ring.radius; y <= ring.radius; y += 1) {
					for (let x = -ring.radius; x <= ring.radius; x += 1) {
						if (Math.abs(x) + Math.abs(y) === ring.radius) {
							cells.push({ dx: x, dy: y, colorId: ring.colorId });
						}
					}
				}
			}
			cells.push({ dx: 0, dy: 0, colorId: "magenta" });
			return cells;
		}
	},
	{
		id: "deco-fan",
		name: "Art Deco Fan",
		category: "single",
		placement: "center",
		description: "A stepped fan with rising gold and amber bands.",
		buildCells() {
			const cells = [];
			for (let row = 0; row < 6; row += 1) {
				const width = row * 2 + 1;
				const colorId = row % 2 === 0 ? "yellow" : "orange";
				for (
					let x = -Math.floor(width / 2);
					x <= Math.floor(width / 2);
					x += 1
				) {
					cells.push({ dx: x, dy: 3 - row, colorId });
				}
			}
			for (let y = -2; y <= 3; y += 1) {
				cells.push({ dx: -6, dy: y, colorId: "brown" });
				cells.push({ dx: 6, dy: y, colorId: "brown" });
			}
			cells.push({ dx: 0, dy: 4, colorId: "white" });
			return cells;
		}
	},
	{
		id: "deco-pillars",
		name: "Art Deco Pillars",
		category: "single",
		placement: "center",
		description: "Symmetric stepped columns with a framed center jewel.",
		buildCells() {
			const cells = [];
			for (let y = -4; y <= 4; y += 1) {
				cells.push({ dx: -6, dy: y, colorId: "brown" });
				cells.push({ dx: 6, dy: y, colorId: "brown" });
			}
			for (let y = -3; y <= 3; y += 1) {
				cells.push({ dx: -5, dy: y, colorId: "orange" });
				cells.push({ dx: 5, dy: y, colorId: "orange" });
			}
			for (let y = -2; y <= 2; y += 1) {
				cells.push({ dx: -4, dy: y, colorId: "yellow" });
				cells.push({ dx: 4, dy: y, colorId: "yellow" });
			}
			for (let x = -2; x <= 2; x += 1) {
				cells.push({ dx: x, dy: -2, colorId: "light_gray" });
				cells.push({ dx: x, dy: 2, colorId: "light_gray" });
			}
			for (let y = -1; y <= 1; y += 1) {
				cells.push({ dx: -2, dy: y, colorId: "light_gray" });
				cells.push({ dx: 2, dy: y, colorId: "light_gray" });
			}
			cells.push({ dx: 0, dy: 0, colorId: "white" });
			return cells;
		}
	},
	{
		id: "star-medallion",
		name: "Star Medallion",
		category: "single",
		placement: "center",
		description: "An eight-point star with a bright central jewel.",
		cells: [
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: 0, dy: -1, colorId: "yellow" },
			{ dx: 0, dy: 1, colorId: "yellow" },
			{ dx: -1, dy: 0, colorId: "yellow" },
			{ dx: 1, dy: 0, colorId: "yellow" },
			{ dx: -2, dy: 0, colorId: "orange" },
			{ dx: 2, dy: 0, colorId: "orange" },
			{ dx: 0, dy: -2, colorId: "orange" },
			{ dx: 0, dy: 2, colorId: "orange" },
			{ dx: -1, dy: -1, colorId: "yellow" },
			{ dx: 1, dy: -1, colorId: "yellow" },
			{ dx: -1, dy: 1, colorId: "yellow" },
			{ dx: 1, dy: 1, colorId: "yellow" },
			{ dx: -2, dy: -2, colorId: "light_blue" },
			{ dx: 2, dy: -2, colorId: "light_blue" },
			{ dx: -2, dy: 2, colorId: "light_blue" },
			{ dx: 2, dy: 2, colorId: "light_blue" }
		]
	},
	{
		id: "lotus-bloom",
		name: "Lotus Bloom",
		category: "single",
		placement: "center",
		description: "A layered bloom with soft petals and a warm core.",
		cells: [
			{ dx: 0, dy: 0, colorId: "yellow" },
			{ dx: -1, dy: 0, colorId: "pink" },
			{ dx: 1, dy: 0, colorId: "pink" },
			{ dx: 0, dy: -1, colorId: "pink" },
			{ dx: 0, dy: 1, colorId: "pink" },
			{ dx: -2, dy: 0, colorId: "magenta" },
			{ dx: 2, dy: 0, colorId: "magenta" },
			{ dx: 0, dy: -2, colorId: "magenta" },
			{ dx: 0, dy: 2, colorId: "magenta" },
			{ dx: -1, dy: -1, colorId: "purple" },
			{ dx: 1, dy: -1, colorId: "purple" },
			{ dx: -1, dy: 1, colorId: "purple" },
			{ dx: 1, dy: 1, colorId: "purple" },
			{ dx: -3, dy: 1, colorId: "pink" },
			{ dx: 3, dy: 1, colorId: "pink" },
			{ dx: -2, dy: 2, colorId: "pink" },
			{ dx: 2, dy: 2, colorId: "pink" }
		]
	},
	{
		id: "hearth-knot",
		name: "Hearth Knot",
		category: "single",
		placement: "center",
		description: "A woven knot medallion with ruby accents and dark anchors.",
		cells: [
			{ dx: -2, dy: -2, colorId: "black" },
			{ dx: -1, dy: -2, colorId: "red" },
			{ dx: 1, dy: -2, colorId: "red" },
			{ dx: 2, dy: -2, colorId: "black" },
			{ dx: -2, dy: -1, colorId: "red" },
			{ dx: 2, dy: -1, colorId: "red" },
			{ dx: -2, dy: 1, colorId: "red" },
			{ dx: 2, dy: 1, colorId: "red" },
			{ dx: -2, dy: 2, colorId: "black" },
			{ dx: -1, dy: 2, colorId: "red" },
			{ dx: 1, dy: 2, colorId: "red" },
			{ dx: 2, dy: 2, colorId: "black" },
			{ dx: 0, dy: -1, colorId: "magenta" },
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: 0, dy: 1, colorId: "magenta" },
			{ dx: -1, dy: 0, colorId: "gray" },
			{ dx: 1, dy: 0, colorId: "gray" }
		]
	},
	{
		id: "wind-rose",
		name: "Wind Rose",
		category: "single",
		placement: "center",
		description: "A directional rose motif with cool outer tips.",
		cells: [
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: 0, dy: -1, colorId: "light_blue" },
			{ dx: 0, dy: -2, colorId: "blue" },
			{ dx: 0, dy: -3, colorId: "light_blue" },
			{ dx: 0, dy: 1, colorId: "light_blue" },
			{ dx: 0, dy: 2, colorId: "blue" },
			{ dx: 0, dy: 3, colorId: "light_blue" },
			{ dx: -1, dy: 0, colorId: "light_blue" },
			{ dx: -2, dy: 0, colorId: "blue" },
			{ dx: -3, dy: 0, colorId: "light_blue" },
			{ dx: 1, dy: 0, colorId: "light_blue" },
			{ dx: 2, dy: 0, colorId: "blue" },
			{ dx: 3, dy: 0, colorId: "light_blue" },
			{ dx: -2, dy: -2, colorId: "cyan" },
			{ dx: 2, dy: -2, colorId: "cyan" },
			{ dx: -2, dy: 2, colorId: "cyan" },
			{ dx: 2, dy: 2, colorId: "cyan" }
		]
	},
	{
		id: "aurora-weave",
		name: "Aurora Weave",
		category: "single",
		placement: "center",
		description: "A cool woven lattice of cyan, blue, and violet glass.",
		cells: [
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: -1, dy: 0, colorId: "cyan" },
			{ dx: 1, dy: 0, colorId: "cyan" },
			{ dx: 0, dy: -1, colorId: "light_blue" },
			{ dx: 0, dy: 1, colorId: "light_blue" },
			{ dx: -2, dy: 0, colorId: "blue" },
			{ dx: 2, dy: 0, colorId: "blue" },
			{ dx: 0, dy: -2, colorId: "blue" },
			{ dx: 0, dy: 2, colorId: "blue" },
			{ dx: -1, dy: -1, colorId: "purple" },
			{ dx: 1, dy: -1, colorId: "purple" },
			{ dx: -1, dy: 1, colorId: "purple" },
			{ dx: 1, dy: 1, colorId: "purple" },
			{ dx: -3, dy: -1, colorId: "magenta" },
			{ dx: 3, dy: -1, colorId: "magenta" },
			{ dx: -3, dy: 1, colorId: "magenta" },
			{ dx: 3, dy: 1, colorId: "magenta" }
		]
	},
	{
		id: "emerald-lattice",
		name: "Emerald Lattice",
		category: "single",
		placement: "center",
		description: "A crisp lattice motif with leaf-green and lime highlights.",
		cells: [
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: -1, dy: 0, colorId: "green" },
			{ dx: 1, dy: 0, colorId: "green" },
			{ dx: 0, dy: -1, colorId: "green" },
			{ dx: 0, dy: 1, colorId: "green" },
			{ dx: -2, dy: 0, colorId: "lime" },
			{ dx: 2, dy: 0, colorId: "lime" },
			{ dx: 0, dy: -2, colorId: "lime" },
			{ dx: 0, dy: 2, colorId: "lime" },
			{ dx: -2, dy: -2, colorId: "cyan" },
			{ dx: 2, dy: -2, colorId: "cyan" },
			{ dx: -2, dy: 2, colorId: "cyan" },
			{ dx: 2, dy: 2, colorId: "cyan" }
		]
	}
];

if (typeof window !== "undefined") {
	window.projectCoreSingleMotifs = {
		SINGLE_MOTIFS
	};
}

if (typeof module !== "undefined") {
	module.exports = {
		SINGLE_MOTIFS
	};
}
