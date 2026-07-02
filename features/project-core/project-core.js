const DEFAULT_PALETTE = {
	name: "Minecraft Stained Glass",
	colors: [
		{ id: "white", name: "White", hex: "#F9FFFE" },
		{ id: "light_gray", name: "Light Gray", hex: "#9D9D97" },
		{ id: "gray", name: "Gray", hex: "#474F52" },
		{ id: "black", name: "Black", hex: "#1D1D21" },
		{ id: "brown", name: "Brown", hex: "#835432" },
		{ id: "red", name: "Red", hex: "#B02E26" },
		{ id: "orange", name: "Orange", hex: "#F9801D" },
		{ id: "yellow", name: "Yellow", hex: "#FED83D" },
		{ id: "lime", name: "Lime", hex: "#80C71F" },
		{ id: "green", name: "Green", hex: "#5E7C16" },
		{ id: "cyan", name: "Cyan", hex: "#169C9C" },
		{ id: "light_blue", name: "Light Blue", hex: "#3AB3DA" },
		{ id: "blue", name: "Blue", hex: "#3C44AA" },
		{ id: "purple", name: "Purple", hex: "#8932B8" },
		{ id: "magenta", name: "Magenta", hex: "#C74EBD" },
		{ id: "pink", name: "Pink", hex: "#F38BAA" }
	]
};

const TEMPLATE_DEFINITIONS = [
	{
		id: "sun",
		name: "Sun",
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
		description: "A compass rose with sky-blue corner points.",
		buildCells() {
			const cells = [];
			for (let i = -5; i <= 5; i += 1) {
				cells.push({ dx: i, dy: 0, colorId: "yellow" });
				cells.push({ dx: 0, dy: i, colorId: "yellow" });
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
				cells.push({ dx, dy, colorId: "light_blue" });
			});
			cells.push({ dx: 0, dy: 0, colorId: "white" });
			return cells;
		}
	},
	{
		id: "flower",
		name: "Flower",
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
		description: "A layered diamond motif with a bright center tile.",
		buildCells() {
			const cells = [];
			const rings = [
				{ radius: 4, colorId: "brown" },
				{ radius: 3, colorId: "orange" },
				{ radius: 2, colorId: "yellow" },
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
			cells.push({ dx: 0, dy: 0, colorId: "yellow" });
			return cells;
		}
	},
	{
		id: "deco-fan",
		name: "Art Deco Fan",
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
	}
];

function createTemplateLibrary({ cols, rows, palette = DEFAULT_PALETTE }) {
	const colorById = new Map(
		palette.colors.map((entry) => [entry.id, entry.hex])
	);
	const fallbackColor = palette.colors[0]?.hex || "#000000";
	const centerX = Math.floor((cols - 1) / 2);
	const centerY = Math.floor((rows - 1) / 2);

	return TEMPLATE_DEFINITIONS.map((definition) => {
		const sourceCells = definition.cells || definition.buildCells();
		const cells = sourceCells
			.map((cell) => ({
				x: centerX + cell.dx,
				y: centerY + cell.dy,
				color: colorById.get(cell.colorId) || fallbackColor
			}))
			.filter((cell) => {
				return cell.x >= 0 && cell.x < cols && cell.y >= 0 && cell.y < rows;
			});

		return {
			id: definition.id,
			name: definition.name,
			description: definition.description,
			cells
		};
	});
}

function createProject({
	cols = 19,
	rows = 15,
	palette = DEFAULT_PALETTE
} = {}) {
	const colors = palette.colors.map((color) => color.hex);
	const grid = Array.from({ length: rows }, () => Array(cols).fill(colors[0]));
	const templates = createTemplateLibrary({ cols, rows, palette });

	return {
		cols,
		rows,
		palette,
		colors,
		templates,
		grid,
		currentColor: colors[0],
		symmetryMode: "None",
		showGrid: false,
		clear() {
			for (let y = 0; y < rows; y += 1) {
				for (let x = 0; x < cols; x += 1) {
					grid[y][x] = colors[0];
				}
			}
		},
		applyTemplate(templateId) {
			const template = templates.find((entry) => entry.id === templateId);
			if (!template) {
				return false;
			}

			this.clear();
			for (const cell of template.cells) {
				grid[cell.y][cell.x] = cell.color;
			}

			return true;
		}
	};
}

function createSymmetryEngine({ cols, rows }) {
	const centerX = (cols - 1) / 2;
	const centerY = (rows - 1) / 2;

	const rotatePoint = (point, segments) => {
		const dx = point.x - centerX;
		const dy = point.y - centerY;
		const degrees = (360 / segments) * (Math.PI / 180);
		const cos = Math.cos(degrees);
		const sin = Math.sin(degrees);
		return {
			x: Math.round(centerX + (dx * cos - dy * sin)),
			y: Math.round(centerY + (dx * sin + dy * cos))
		};
	};

	const unique = (points) => {
		const seen = new Set();
		return points.filter((point) => {
			const key = `${point.x},${point.y}`;
			if (seen.has(key)) {
				return false;
			}
			seen.add(key);
			return true;
		});
	};

	function getPoints(x, y, mode) {
		const points = [{ x, y }];
		switch (mode) {
			case "Horizontal":
				points.push({ x: cols - 1 - x, y });
				break;
			case "Vertical":
				points.push({ x, y: rows - 1 - y });
				break;
			case "180°":
				points.push({ x: cols - 1 - x, y: rows - 1 - y });
				break;
			case "Quad":
				points.push({ x: cols - 1 - x, y });
				points.push({ x, y: rows - 1 - y });
				points.push({ x: cols - 1 - x, y: rows - 1 - y });
				break;
			case "4-Way Radial": {
				const origin = { x, y };
				let current = origin;
				for (let i = 0; i < 4; i += 1) {
					points.push(current);
					current = rotatePoint(current, 4);
				}
				break;
			}
			case "8-Way Radial": {
				const origin = { x, y };
				let current = origin;
				for (let i = 0; i < 8; i += 1) {
					points.push(current);
					current = rotatePoint(current, 8);
				}
				break;
			}
			case "Diagonal ↘":
				if (x < rows && y < cols) {
					points.push({ x: y, y: x });
				}
				break;
			case "Diagonal ↗": {
				const nx = cols - 1 - x;
				const ny = rows - 1 - y;
				const mx = cols - 1 - y;
				const my = rows - 1 - x;
				if (mx >= 0 && mx < cols && my >= 0 && my < rows) {
					points.push({ x: mx, y: my });
				}
				if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
					points.push({ x: nx, y: ny });
				}
				break;
			}
			default:
				break;
		}

		return unique(points).filter((point) => {
			return point.x >= 0 && point.x < cols && point.y >= 0 && point.y < rows;
		});
	}

	return { getPoints };
}

if (typeof window !== "undefined") {
	window.projectCore = {
		createProject,
		createSymmetryEngine,
		createTemplateLibrary,
		DEFAULT_PALETTE
	};
}

if (typeof module !== "undefined") {
	module.exports = {
		createProject,
		createSymmetryEngine,
		createTemplateLibrary,
		DEFAULT_PALETTE
	};
}
