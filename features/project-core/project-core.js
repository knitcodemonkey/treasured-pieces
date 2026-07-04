const DEFAULT_PALETTE = {
	name: "Minecraft Stained Glass",
	colors: [
		{ id: "clear", name: "Clear", hex: "#F9FFFE" },
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
		{ id: "pink", name: "Pink", hex: "#F38BAA" },
		{ id: "white", name: "White", hex: "#FFFFFF" }
	]
};

const TEMPLATE_LIBRARY_DEFINITIONS = (() => {
	if (typeof module !== "undefined" && module.exports) {
		const motifModule = require("./motifs");
		return {
			standard: motifModule.TEMPLATE_DEFINITIONS || [],
			mapArt: motifModule.MAP_ART_TEMPLATE_DEFINITIONS || []
		};
	}
	if (typeof window !== "undefined") {
		return {
			standard: window.projectCoreMotifs?.TEMPLATE_DEFINITIONS || [],
			mapArt: window.projectCoreMotifs?.MAP_ART_TEMPLATE_DEFINITIONS || []
		};
	}
	return {
		standard: [],
		mapArt: []
	};
})();

function createTemplateLibrary({
	cols,
	rows,
	palette = DEFAULT_PALETTE,
	templateDefinitions = TEMPLATE_LIBRARY_DEFINITIONS.standard
}) {
	const colorById = new Map(
		palette.colors.map((entry) => [entry.id, entry.hex])
	);
	const fallbackColor = palette.colors[0]?.hex || "#000000";

	function resolveSourceCells(definition) {
		return definition.cells || definition.buildCells();
	}

	function normalizeSingleCells(sourceCells) {
		let minDx = Infinity;
		let minDy = Infinity;
		for (const cell of sourceCells) {
			if (cell.dx < minDx) {
				minDx = cell.dx;
			}
			if (cell.dy < minDy) {
				minDy = cell.dy;
			}
		}

		return sourceCells.map((cell) => ({
			x: cell.dx - minDx,
			y: cell.dy - minDy,
			color: colorById.get(cell.colorId) || fallbackColor
		}));
	}

	function normalizePatternCells(sourceCells) {
		let minDx = Infinity;
		let minDy = Infinity;
		for (const cell of sourceCells) {
			if (cell.dx < minDx) {
				minDx = cell.dx;
			}
			if (cell.dy < minDy) {
				minDy = cell.dy;
			}
		}

		return sourceCells.map((cell) => ({
			x: cell.dx - minDx,
			y: cell.dy - minDy,
			color: colorById.get(cell.colorId) || fallbackColor
		}));
	}

	function computePatternBounds(patternCells) {
		let maxX = 0;
		let maxY = 0;
		for (const cell of patternCells) {
			if (cell.x > maxX) {
				maxX = cell.x;
			}
			if (cell.y > maxY) {
				maxY = cell.y;
			}
		}

		return {
			width: maxX + 1,
			height: maxY + 1
		};
	}

	function centerPatternForPreview(patternCells, width, height) {
		const startX = Math.floor((cols - width) / 2);
		const startY = Math.floor((rows - height) / 2);

		return patternCells
			.map((cell) => ({
				x: startX + cell.x,
				y: startY + cell.y,
				color: cell.color
			}))
			.filter((cell) => {
				return cell.x >= 0 && cell.x < cols && cell.y >= 0 && cell.y < rows;
			});
	}

	function normalizeCornerCells(cornerCellMap = {}) {
		const result = {};
		for (const [cornerKey, cells] of Object.entries(cornerCellMap)) {
			if (!Array.isArray(cells) || cells.length === 0) {
				continue;
			}
			const patternCells = normalizePatternCells(cells);
			const bounds = computePatternBounds(patternCells);
			result[cornerKey] = {
				cells: patternCells,
				width: bounds.width,
				height: bounds.height
			};
		}
		return result;
	}

	return templateDefinitions.map((definition) => {
		const sourceCells = resolveSourceCells(definition);
		const placement = definition.placement || "center";
		const category = definition.category || "single";

		if (placement === "border-repeat") {
			const patternCells = normalizePatternCells(sourceCells);
			const bounds = computePatternBounds(patternCells);
			const patternWidth = definition.patternWidth || bounds.width;
			const patternHeight = definition.patternHeight || bounds.height;
			const cornerPatterns = normalizeCornerCells(definition.cornerCells);
			const hasCornerCompanions =
				Boolean(definition.hasCornerCompanions) ||
				Object.keys(cornerPatterns).length > 0;

			return {
				id: definition.id,
				name: definition.name,
				description: definition.description,
				category,
				placement,
				sourceWidth: patternWidth,
				sourceHeight: patternHeight,
				patternWidth,
				patternHeight,
				hasCornerCompanions,
				cornerPatterns,
				patternCells,
				cells: centerPatternForPreview(
					patternCells,
					patternWidth,
					patternHeight
				)
			};
		}

		const normalizedCells = normalizeSingleCells(sourceCells);
		const bounds = computePatternBounds(normalizedCells);
		const cells = centerPatternForPreview(
			normalizedCells,
			bounds.width,
			bounds.height
		);

		return {
			id: definition.id,
			name: definition.name,
			description: definition.description,
			category,
			placement,
			sourceWidth: bounds.width,
			sourceHeight: bounds.height,
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
	const createGrid = (width, height) => {
		return Array.from({ length: height }, () => Array(width).fill(colors[0]));
	};

	const project = {
		cols,
		rows,
		palette,
		colors,
		templates: createTemplateLibrary({
			cols,
			rows,
			palette,
			templateDefinitions: TEMPLATE_LIBRARY_DEFINITIONS.standard
		}),
		mapArtTemplates: createTemplateLibrary({
			cols,
			rows,
			palette,
			templateDefinitions: TEMPLATE_LIBRARY_DEFINITIONS.mapArt
		}),
		grid: createGrid(cols, rows),
		currentColor: colors[0],
		symmetryMode: "None",
		showGrid: true,
		clear() {
			for (let y = 0; y < this.rows; y += 1) {
				for (let x = 0; x < this.cols; x += 1) {
					this.grid[y][x] = colors[0];
				}
			}
		},
		resize(nextCols, nextRows, { preserve = true } = {}) {
			const parsedCols = Number(nextCols);
			const parsedRows = Number(nextRows);
			if (!Number.isFinite(parsedCols) || !Number.isFinite(parsedRows)) {
				return false;
			}

			const width = Math.trunc(parsedCols);
			const height = Math.trunc(parsedRows);
			if (width < 1 || height < 1) {
				return false;
			}

			const nextGrid = createGrid(width, height);
			if (preserve) {
				const copyRows = Math.min(this.rows, height);
				const copyCols = Math.min(this.cols, width);
				for (let y = 0; y < copyRows; y += 1) {
					for (let x = 0; x < copyCols; x += 1) {
						nextGrid[y][x] = this.grid[y][x];
					}
				}
			}

			this.cols = width;
			this.rows = height;
			this.grid = nextGrid;
			this.templates = createTemplateLibrary({
				cols: width,
				rows: height,
				palette,
				templateDefinitions: TEMPLATE_LIBRARY_DEFINITIONS.standard
			});
			this.mapArtTemplates = createTemplateLibrary({
				cols: width,
				rows: height,
				palette,
				templateDefinitions: TEMPLATE_LIBRARY_DEFINITIONS.mapArt
			});
			return true;
		},
		getTemplateLibrary(library = "standard") {
			if (library === "mapArt") {
				return this.mapArtTemplates;
			}
			return this.templates;
		},
		applyTemplate(templateId, { library = "standard" } = {}) {
			const templateLibrary = this.getTemplateLibrary(library);
			const template = templateLibrary.find((entry) => entry.id === templateId);
			if (!template) {
				return false;
			}

			const cols = this.cols;
			const rows = this.rows;
			const grid = this.grid;

			if (template.placement === "border-repeat") {
				const touched = new Set();
				const horizontalWidthStep = Math.max(1, template.patternWidth || 1);
				const horizontalHeightStep = Math.max(1, template.patternHeight || 1);
				const horizontalPattern = template.patternCells || [];

				// Rotate the edge tile for left/right passes so border thickness matches
				// top/bottom thickness on square and rectangular motifs.
				const verticalPattern = horizontalPattern.map((cell) => ({
					x: cell.y,
					y: cell.x,
					color: cell.color
				}));
				const verticalWidthStep = Math.max(1, horizontalHeightStep);
				const verticalHeightStep = Math.max(1, horizontalWidthStep);

				const startBottom = Math.max(0, rows - horizontalHeightStep);
				const startRight = Math.max(0, cols - verticalWidthStep);

				const buildCenteredAnchors = (span, step) => {
					const repeatCount = Math.max(1, Math.ceil(span / step));
					const totalCoverage = repeatCount * step;
					const start = Math.floor((span - totalCoverage) / 2);
					return Array.from(
						{ length: repeatCount },
						(_, index) => start + index * step
					);
				};

				const paintPattern = (
					patternCells,
					originX,
					originY,
					force = false
				) => {
					for (const cell of patternCells || []) {
						const x = originX + cell.x;
						const y = originY + cell.y;
						if (x < 0 || x >= cols || y < 0 || y >= rows) {
							continue;
						}
						const key = `${x},${y}`;
						if (!force && touched.has(key)) {
							continue;
						}
						touched.add(key);
						grid[y][x] = cell.color;
					}
				};

				for (const x of buildCenteredAnchors(cols, horizontalWidthStep)) {
					paintPattern(horizontalPattern, x, 0);
					paintPattern(horizontalPattern, x, startBottom);
				}

				for (const y of buildCenteredAnchors(rows, verticalHeightStep)) {
					paintPattern(verticalPattern, 0, y);
					paintPattern(verticalPattern, startRight, y);
				}

				const corners = template.cornerPatterns || {};
				if (corners.topLeft) {
					paintPattern(corners.topLeft.cells, 0, 0, true);
				}
				if (corners.topRight) {
					paintPattern(
						corners.topRight.cells,
						Math.max(0, cols - corners.topRight.width),
						0,
						true
					);
				}
				if (corners.bottomLeft) {
					paintPattern(
						corners.bottomLeft.cells,
						0,
						Math.max(0, rows - corners.bottomLeft.height),
						true
					);
				}
				if (corners.bottomRight) {
					paintPattern(
						corners.bottomRight.cells,
						Math.max(0, cols - corners.bottomRight.width),
						Math.max(0, rows - corners.bottomRight.height),
						true
					);
				}
			} else {
				this.clear();
				for (const cell of template.cells) {
					grid[cell.y][cell.x] = cell.color;
				}
			}

			return true;
		}
	};

	return project;
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
