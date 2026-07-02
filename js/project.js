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

function createProject({
	cols = 19,
	rows = 15,
	palette = DEFAULT_PALETTE
} = {}) {
	const colors = palette.colors.map((color) => color.hex);
	const grid = Array.from({ length: rows }, () => Array(cols).fill(colors[0]));

	return {
		cols,
		rows,
		palette,
		colors,
		grid,
		currentColor: colors[0],
		symmetryMode: "None",
		showGrid: true,
		clear() {
			for (let y = 0; y < rows; y += 1) {
				for (let x = 0; x < cols; x += 1) {
					grid[y][x] = colors[0];
				}
			}
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
	window.projectModule = {
		createProject,
		createSymmetryEngine,
		DEFAULT_PALETTE
	};
}
if (typeof module !== "undefined") {
	module.exports = { createProject, createSymmetryEngine, DEFAULT_PALETTE };
}
