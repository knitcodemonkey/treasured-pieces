const COLS = 19;
const ROWS = 15;
const CELL = 30;
const MIN_DIMENSION = 5;
const MAX_DIMENSION = 60;
const CANVAS_SIZE_STORAGE_KEY = "treasuredpieces.canvasSize";
const MAP_ART_VIEW_STORAGE_KEY = "treasuredpieces.mapArtView";
const MIN_MAP_ART_CELL = 2;

function parseDimension(value, fallback) {
	const parsed = Number(value);
	if (!Number.isFinite(parsed)) {
		return fallback;
	}

	const clamped = Math.max(
		MIN_DIMENSION,
		Math.min(MAX_DIMENSION, Math.trunc(parsed))
	);
	return clamped;
}

function loadStoredCanvasSize() {
	try {
		const raw = window.localStorage.getItem(CANVAS_SIZE_STORAGE_KEY);
		if (!raw) {
			return null;
		}

		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") {
			return null;
		}

		const cols = parseDimension(parsed.cols, COLS);
		const rows = parseDimension(parsed.rows, ROWS);
		return { cols, rows };
	} catch {
		return null;
	}
}

function saveCanvasSize(cols, rows) {
	try {
		window.localStorage.setItem(
			CANVAS_SIZE_STORAGE_KEY,
			JSON.stringify({ cols, rows })
		);
	} catch {
		// Ignore storage failures (for example private browsing restrictions).
	}
}

function loadStoredMapArtView() {
	try {
		return window.localStorage.getItem(MAP_ART_VIEW_STORAGE_KEY) === "1";
	} catch {
		return false;
	}
}

function saveMapArtView(enabled) {
	try {
		window.localStorage.setItem(MAP_ART_VIEW_STORAGE_KEY, enabled ? "1" : "0");
	} catch {
		// Ignore storage failures (for example private browsing restrictions).
	}
}

function createPaletteUI({ palette, container, tooltipHost, onSelect }) {
	const tooltip = tooltipHost || document.createElement("div");
	if (!tooltipHost) {
		tooltip.className = "tooltip";
		document.body.appendChild(tooltip);
	}

	const swatches = [];
	const byHex = new Map();

	function positionTooltipForSwatch(swatch) {
		const rect = swatch.getBoundingClientRect();
		const viewportPadding = 8;
		const gap = 8;
		const tooltipWidth = tooltip.offsetWidth;
		const tooltipHeight = tooltip.offsetHeight;

		let left = rect.left + rect.width / 2;
		const halfWidth = tooltipWidth / 2;
		if (left - halfWidth < viewportPadding) {
			left = viewportPadding + halfWidth;
		}
		if (left + halfWidth > window.innerWidth - viewportPadding) {
			left = window.innerWidth - viewportPadding - halfWidth;
		}

		const topY = rect.top - gap;
		const hasRoomAbove = topY - tooltipHeight > viewportPadding;
		tooltip.dataset.placement = hasRoomAbove ? "top" : "bottom";
		const top = hasRoomAbove ? topY : rect.bottom + gap;

		tooltip.style.left = `${left}px`;
		tooltip.style.top = `${top}px`;
	}

	function showTooltipForSwatch(swatch, entry) {
		tooltip.innerHTML = `<strong>${entry.name}</strong><div class="sub">${palette.name}</div>`;
		tooltip.style.opacity = "1";
		positionTooltipForSwatch(swatch);
	}

	function hideTooltip() {
		tooltip.style.opacity = "0";
	}

	function setSelected(selectedSwatch, { focus = true } = {}) {
		swatches.forEach((item) => {
			const isActive = item === selectedSwatch;
			item.classList.toggle("sel", isActive);
			item.setAttribute("aria-checked", isActive ? "true" : "false");
			item.tabIndex = isActive ? 0 : -1;
		});
		if (focus) {
			selectedSwatch?.focus();
		}
	}

	function selectByIndex(nextIndex, { focus = true } = {}) {
		const boundedIndex = Math.max(0, Math.min(swatches.length - 1, nextIndex));
		const swatch = swatches[boundedIndex];
		if (!swatch) {
			return;
		}

		setSelected(swatch, { focus });
		onSelect(palette.colors[boundedIndex].hex);
	}

	function selectByHex(hex, { focus = false, notify = false } = {}) {
		if (!hex) {
			return false;
		}

		const normalized = String(hex).toUpperCase();
		const swatch = byHex.get(normalized);
		if (!swatch) {
			return false;
		}

		setSelected(swatch, { focus });
		if (notify) {
			const index = swatches.indexOf(swatch);
			if (index >= 0) {
				onSelect(palette.colors[index].hex);
			}
		}

		return true;
	}

	palette.colors.forEach((entry, index) => {
		const swatch = document.createElement("button");
		swatch.type = "button";
		swatch.setAttribute("role", "radio");
		swatch.setAttribute("aria-label", `${entry.name} (${entry.hex})`);
		swatch.setAttribute("aria-checked", index === 0 ? "true" : "false");
		swatch.tabIndex = index === 0 ? 0 : -1;
		swatch.className = `swatch${index === 0 ? " sel" : ""}`;
		swatch.style.background = entry.hex;
		byHex.set(entry.hex.toUpperCase(), swatch);

		swatch.addEventListener("mouseenter", () => {
			showTooltipForSwatch(swatch, entry);
		});

		swatch.addEventListener("mousemove", () => {
			positionTooltipForSwatch(swatch);
		});

		swatch.addEventListener("pointerenter", () => {
			showTooltipForSwatch(swatch, entry);
		});

		swatch.addEventListener("pointermove", () => {
			positionTooltipForSwatch(swatch);
		});

		swatch.addEventListener("mouseleave", hideTooltip);
		swatch.addEventListener("pointerleave", hideTooltip);
		swatch.addEventListener("blur", hideTooltip);

		swatch.addEventListener("click", () => {
			selectByIndex(index);
		});

		swatch.addEventListener("keydown", (event) => {
			const currentIndex = swatches.indexOf(swatch);
			switch (event.key) {
				case "ArrowRight":
				case "ArrowDown":
					event.preventDefault();
					selectByIndex(currentIndex + 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					event.preventDefault();
					selectByIndex(currentIndex - 1);
					break;
				case "Home":
					event.preventDefault();
					selectByIndex(0);
					break;
				case "End":
					event.preventDefault();
					selectByIndex(swatches.length - 1);
					break;
				case "Enter":
				case " ":
					event.preventDefault();
					selectByIndex(index);
					break;
				default:
					break;
			}
		});

		container.appendChild(swatch);
		swatches.push(swatch);
	});

	return {
		selectByHex
	};
}

function createToolbarUI({
	gridToggle,
	mapArtToggle,
	symmetrySelect,
	widthInput,
	heightInput,
	resizeButton,
	clearButton,
	openMotifsButton,
	closeMotifsButton,
	motifModal,
	motifModalBackdrop,
	onOpenMotifs,
	onCloseMotifs,
	onToggleGrid,
	onToggleMapArt,
	onChangeSymmetry,
	onResize,
	onClear
}) {
	function readRequestedSize() {
		const width = parseDimension(widthInput?.value, COLS);
		const height = parseDimension(heightInput?.value, ROWS);
		if (widthInput) {
			widthInput.value = String(width);
		}
		if (heightInput) {
			heightInput.value = String(height);
		}
		return { cols: width, rows: height };
	}

	function openMotifsModal() {
		if (!motifModal) {
			return;
		}
		motifModal.hidden = false;
		document.body.style.overflow = "hidden";
		onOpenMotifs?.();
	}

	function closeMotifsModal() {
		if (!motifModal) {
			return;
		}
		motifModal.hidden = true;
		document.body.style.overflow = "";
		onCloseMotifs?.();
	}

	openMotifsButton?.addEventListener("click", openMotifsModal);
	closeMotifsButton?.addEventListener("click", closeMotifsModal);
	motifModalBackdrop?.addEventListener("click", closeMotifsModal);

	window.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && motifModal && !motifModal.hidden) {
			closeMotifsModal();
		}
	});

	gridToggle?.addEventListener("change", () => {
		onToggleGrid?.(gridToggle.checked);
	});

	mapArtToggle?.addEventListener("change", () => {
		onToggleMapArt?.(mapArtToggle.checked);
	});

	symmetrySelect.addEventListener("change", () => {
		onChangeSymmetry(symmetrySelect.value);
	});

	resizeButton?.addEventListener("click", () => {
		onResize?.(readRequestedSize());
	});

	const handleSizeKey = (event) => {
		if (event.key !== "Enter") {
			return;
		}
		event.preventDefault();
		onResize?.(readRequestedSize());
	};

	widthInput?.addEventListener("keydown", handleSizeKey);
	heightInput?.addEventListener("keydown", handleSizeKey);

	clearButton.addEventListener("click", () => {
		onClear();
	});

	return {
		openMotifsModal,
		closeMotifsModal,
		syncMapArtToggle(enabled) {
			if (mapArtToggle) {
				mapArtToggle.checked = Boolean(enabled);
			}
		},
		syncSizeInputs(cols, rows) {
			if (widthInput) {
				widthInput.value = String(cols);
			}
			if (heightInput) {
				heightInput.value = String(rows);
			}
		}
	};
}

function createMotifPickerUI({ container, motifs, cols, rows, onLoadMotif }) {
	if (!container) {
		return { setActiveMotif: () => {}, setLibrary: () => {} };
	}

	const PREVIEW_WIDTH = 48;
	const PREVIEW_HEIGHT = 38;
	const motifButtons = [];
	let currentMotifs = motifs;
	let currentCols = cols;
	let currentRows = rows;

	function renderMotifPreview(canvas, motif) {
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#f9fffe";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (!motif || !Array.isArray(motif.cells)) {
			return;
		}

		const cellW = canvas.width / currentCols;
		const cellH = canvas.height / currentRows;
		for (const cell of motif.cells) {
			ctx.fillStyle = cell.color;
			ctx.fillRect(cell.x * cellW, cell.y * cellH, cellW, cellH);
		}

		ctx.strokeStyle = "rgba(0, 0, 0, 0.12)";
		ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
	}

	function setActiveMotif(motifId) {
		motifButtons.forEach((button) => {
			const isActive = button.dataset.motifId === motifId;
			button.classList.toggle("is-active", isActive);
			button.setAttribute("aria-pressed", isActive ? "true" : "false");
		});
	}

	function addSectionTitle(text) {
		const title = document.createElement("h3");
		title.className = "motif-section-title";
		title.textContent = text;
		container.appendChild(title);
	}

	function getMotifDimensions(motif) {
		if (motif?.placement === "border-repeat") {
			return {
				width: motif.sourceWidth || motif.patternWidth || 0,
				height: motif.sourceHeight || motif.patternHeight || 0,
				isTile: true
			};
		}

		if (motif?.sourceWidth && motif?.sourceHeight) {
			return {
				width: motif.sourceWidth,
				height: motif.sourceHeight,
				isTile: false
			};
		}

		if (!motif || !Array.isArray(motif.cells) || motif.cells.length === 0) {
			return null;
		}

		let minX = Infinity;
		let maxX = -Infinity;
		let minY = Infinity;
		let maxY = -Infinity;

		for (const cell of motif.cells) {
			if (cell.x < minX) {
				minX = cell.x;
			}
			if (cell.x > maxX) {
				maxX = cell.x;
			}
			if (cell.y < minY) {
				minY = cell.y;
			}
			if (cell.y > maxY) {
				maxY = cell.y;
			}
		}

		return {
			width: maxX - minX + 1,
			height: maxY - minY + 1,
			isTile: false
		};
	}

	function addMotifButton({ id, name, motif, onClick }) {
		const dimensions = getMotifDimensions(motif);
		const button = document.createElement("button");
		button.type = "button";
		button.className = "motif-option";
		button.dataset.motifId = id;
		button.setAttribute("aria-pressed", "false");
		button.setAttribute(
			"aria-label",
			dimensions
				? dimensions.isTile
					? `Load border motif ${name}, tile ${dimensions.width} by ${dimensions.height} cells`
					: `Load motif ${name}, ${dimensions.width} by ${dimensions.height} cells`
				: `Load motif ${name}`
		);

		const preview = document.createElement("canvas");
		preview.className = "motif-preview";
		preview.width = PREVIEW_WIDTH;
		preview.height = PREVIEW_HEIGHT;
		renderMotifPreview(preview, motif);

		const label = document.createElement("span");
		label.className = "motif-name";
		label.textContent = name;

		const titleRow = document.createElement("div");
		titleRow.className = "motif-title-row";
		titleRow.appendChild(label);

		if (dimensions?.isTile && motif.hasCornerCompanions) {
			const cornerBadge = document.createElement("span");
			cornerBadge.className = "motif-badge";
			cornerBadge.textContent = "Corners";
			titleRow.appendChild(cornerBadge);
		}

		const dimensionsLabel = document.createElement("span");
		dimensionsLabel.className = "motif-dimensions";
		dimensionsLabel.textContent = dimensions
			? dimensions.isTile
				? motif.hasCornerCompanions
					? `Tile ${dimensions.width} x ${dimensions.height} + corners`
					: `Tile ${dimensions.width} x ${dimensions.height}`
				: `${dimensions.width} x ${dimensions.height}`
			: "-";

		const meta = document.createElement("div");
		meta.className = "motif-meta";
		meta.appendChild(titleRow);
		meta.appendChild(dimensionsLabel);

		button.appendChild(preview);
		button.appendChild(meta);
		button.addEventListener("click", onClick);

		container.appendChild(button);
		motifButtons.push(button);
	}

	function render() {
		container.innerHTML = "";
		motifButtons.length = 0;

		const centeredMotifs = currentMotifs.filter(
			(motif) => (motif.category || "single") === "single"
		);
		const borderMotifs = currentMotifs.filter(
			(motif) => motif.category === "border"
		);

		if (centeredMotifs.length > 0) {
			addSectionTitle("Single Motifs (Centered)");
			centeredMotifs.forEach((motif) => {
				addMotifButton({
					id: motif.id,
					name: motif.name,
					motif,
					onClick: () => {
						const loaded = onLoadMotif?.(motif.id);
						if (loaded !== false) {
							setActiveMotif(motif.id);
						}
					}
				});
			});
		}

		if (borderMotifs.length > 0) {
			addSectionTitle("Repeatable Border Motifs");
			borderMotifs.forEach((motif) => {
				addMotifButton({
					id: motif.id,
					name: motif.name,
					motif,
					onClick: () => {
						const loaded = onLoadMotif?.(motif.id);
						if (loaded !== false) {
							setActiveMotif(motif.id);
						}
					}
				});
			});
		}
	}

	render();

	return {
		setActiveMotif,
		setLibrary({ motifs: nextMotifs, cols: nextCols, rows: nextRows }) {
			currentMotifs = nextMotifs;
			currentCols = nextCols;
			currentRows = nextRows;
			render();
		}
	};
}

function createCanvasController({
	canvas,
	context,
	project,
	getSymmetryEngine,
	getCellSize,
	onPenToggleEraser,
	onRender
}) {
	let drawing = false;
	let lastPaintedCell = null;
	let activePointerId = null;
	let hasSeenPenInput = false;
	let lastPenTapTime = 0;
	let lastPenTapCell = null;
	const PEN_TOGGLE_WINDOW_MS = 320;

	function getCellFromEvent(event) {
		const cellSize = getCellSize();
		const rect = canvas.getBoundingClientRect();
		const x = Math.floor((event.clientX - rect.left) / cellSize);
		const y = Math.floor((event.clientY - rect.top) / cellSize);

		if (x < 0 || x >= project.cols || y < 0 || y >= project.rows) {
			return null;
		}

		return { x, y };
	}

	function paintCell(x, y) {
		const symmetryEngine = getSymmetryEngine();
		for (const point of symmetryEngine.getPoints(x, y, project.symmetryMode)) {
			project.grid[point.y][point.x] = project.currentColor;
		}
	}

	function paintLine(fromCell, toCell) {
		let x0 = fromCell.x;
		let y0 = fromCell.y;
		const x1 = toCell.x;
		const y1 = toCell.y;

		const deltaX = Math.abs(x1 - x0);
		const deltaY = Math.abs(y1 - y0);
		const stepX = x0 < x1 ? 1 : -1;
		const stepY = y0 < y1 ? 1 : -1;
		let error = deltaX - deltaY;

		while (true) {
			paintCell(x0, y0);

			if (x0 === x1 && y0 === y1) {
				break;
			}

			const doubledError = error * 2;
			if (doubledError > -deltaY) {
				error -= deltaY;
				x0 += stepX;
			}
			if (doubledError < deltaX) {
				error += deltaX;
				y0 += stepY;
			}
		}
	}

	function shouldIgnorePointer(event) {
		if (!event.isPrimary) {
			return true;
		}

		// On iPad, once pencil input is detected, ignore touch pointers to reduce
		// accidental marks from palm or hand contact during stylus drawing.
		if (hasSeenPenInput && event.pointerType === "touch") {
			return true;
		}

		return false;
	}

	function render() {
		const cellSize = getCellSize();
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (let y = 0; y < project.rows; y += 1) {
			for (let x = 0; x < project.cols; x += 1) {
				context.fillStyle = project.grid[y][x];
				context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
			}
		}

		if (project.showGrid) {
			context.strokeStyle = "#777";
			context.lineWidth = 1;
			for (let x = 0; x <= project.cols; x += 1) {
				context.beginPath();
				context.moveTo(x * cellSize + 0.5, 0);
				context.lineTo(x * cellSize + 0.5, project.rows * cellSize);
				context.stroke();
			}
			for (let y = 0; y <= project.rows; y += 1) {
				context.beginPath();
				context.moveTo(0, y * cellSize + 0.5);
				context.lineTo(project.cols * cellSize, y * cellSize + 0.5);
				context.stroke();
			}
		}

		const centerX = project.cols / 2;
		const centerY = project.rows / 2;
		context.strokeStyle = "rgba(255,215,0,.45)";
		context.beginPath();
		context.moveTo(centerX * cellSize, 0);
		context.lineTo(centerX * cellSize, project.rows * cellSize);
		context.stroke();
		context.beginPath();
		context.moveTo(0, centerY * cellSize);
		context.lineTo(project.cols * cellSize, centerY * cellSize);
		context.stroke();
		context.fillStyle = "gold";
		const centerDotRadius = Math.max(1, Math.min(3, cellSize / 3));
		context.beginPath();
		context.arc(
			centerX * cellSize,
			centerY * cellSize,
			centerDotRadius,
			0,
			Math.PI * 2
		);
		context.fill();

		onRender?.();
	}

	function paintEvent(event) {
		const nextCell = getCellFromEvent(event);
		if (!nextCell) {
			return;
		}

		if (
			lastPaintedCell &&
			lastPaintedCell.x === nextCell.x &&
			lastPaintedCell.y === nextCell.y
		) {
			return;
		}

		if (lastPaintedCell) {
			paintLine(lastPaintedCell, nextCell);
		} else {
			paintCell(nextCell.x, nextCell.y);
		}

		lastPaintedCell = nextCell;

		render();
	}

	canvas.addEventListener("pointerdown", (event) => {
		if (shouldIgnorePointer(event)) {
			return;
		}

		if (event.pointerType === "pen") {
			const penCell = getCellFromEvent(event);
			const now = Date.now();
			const isDoubleTapToggle =
				penCell &&
				lastPenTapCell &&
				now - lastPenTapTime <= PEN_TOGGLE_WINDOW_MS &&
				lastPenTapCell.x === penCell.x &&
				lastPenTapCell.y === penCell.y;

			if (isDoubleTapToggle) {
				onPenToggleEraser?.();
				lastPenTapTime = 0;
				lastPenTapCell = null;
				drawing = false;
				activePointerId = null;
				lastPaintedCell = null;
				return;
			}

			lastPenTapTime = now;
			lastPenTapCell = penCell;
		}

		event.preventDefault();
		activePointerId = event.pointerId;
		if (event.pointerType === "pen") {
			hasSeenPenInput = true;
		}
		canvas.setPointerCapture?.(event.pointerId);

		drawing = true;
		lastPaintedCell = null;
		paintEvent(event);
	});

	canvas.addEventListener("pointermove", (event) => {
		if (!drawing || event.pointerId !== activePointerId) {
			return;
		}

		event.preventDefault();
		paintEvent(event);
	});

	canvas.addEventListener("pointercancel", (event) => {
		if (event.pointerId !== activePointerId) {
			return;
		}

		drawing = false;
		activePointerId = null;
		lastPaintedCell = null;
	});

	window.addEventListener("pointerup", (event) => {
		if (event.pointerId !== activePointerId) {
			return;
		}

		drawing = false;
		activePointerId = null;
		lastPaintedCell = null;
	});

	return { render };
}

function createColorUsageUI({ container, summary, project }) {
	if (!container || !project?.palette?.colors) {
		return { render: () => {} };
	}

	const normalizeColor = (value) => String(value || "").toUpperCase();

	function render() {
		const counts = new Map(
			project.palette.colors.map((entry) => [normalizeColor(entry.hex), 0])
		);

		for (let y = 0; y < project.rows; y += 1) {
			for (let x = 0; x < project.cols; x += 1) {
				const key = normalizeColor(project.grid[y][x]);
				counts.set(key, (counts.get(key) || 0) + 1);
			}
		}

		const entries = project.palette.colors
			.map((entry) => {
				const count = counts.get(normalizeColor(entry.hex)) || 0;
				return {
					...entry,
					count
				};
			})
			.filter((entry) => entry.count > 0);

		entries.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

		const defaultColor = normalizeColor(project.palette.colors[0]?.hex);
		const totalCells = project.cols * project.rows;
		const defaultCount = counts.get(defaultColor) || 0;
		const coloredCount = totalCells - defaultCount;

		if (summary) {
			summary.textContent = `${coloredCount} colored cells • ${totalCells} total`;
		}

		container.innerHTML = "";
		for (const entry of entries) {
			const item = document.createElement("div");
			item.className = "count-item";

			const swatch = document.createElement("span");
			swatch.className = "count-swatch";
			swatch.style.background = entry.hex;

			const name = document.createElement("span");
			name.className = "count-name";
			name.textContent = entry.name;

			const value = document.createElement("span");
			value.className = "count-value";
			value.textContent = String(entry.count);

			item.appendChild(swatch);
			item.appendChild(name);
			item.appendChild(value);
			container.appendChild(item);
		}
	}

	return { render };
}

function updateVersionLabel(versionLabel) {
	const pageVersion =
		document.body.dataset.version ||
		versionLabel?.textContent?.trim() ||
		"v0.0.0";

	if (!versionLabel) {
		return pageVersion;
	}

	versionLabel.textContent = pageVersion;
	return pageVersion;
}

function syncCanvasElementSize(canvas, cols, rows, cellSize) {
	canvas.width = Math.max(1, Math.round(cols * cellSize));
	canvas.height = Math.max(1, Math.round(rows * cellSize));
}

function calculateMapArtCellSize(cols, rows, canvasPanel) {
	if (!cols || !rows) {
		return CELL;
	}

	const panelWidth = canvasPanel?.clientWidth || window.innerWidth;
	const panelTop = canvasPanel?.getBoundingClientRect().top || 240;
	const availableWidth = Math.max(120, panelWidth - 28);
	const availableHeight = Math.max(120, window.innerHeight - panelTop - 24);
	const fitCell = Math.floor(
		Math.min(availableWidth / cols, availableHeight / rows)
	);

	if (!Number.isFinite(fitCell)) {
		return CELL;
	}

	return Math.max(MIN_MAP_ART_CELL, Math.min(CELL, fitCell));
}

function bootstrap() {
	const versionLabel = document.getElementById("appVersion");
	if (versionLabel) {
		versionLabel.textContent =
			document.body.dataset.version || versionLabel.textContent || "v0.0.0";
	}

	updateVersionLabel(versionLabel);
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const paletteContainer = document.getElementById("palette");
	const gridToggle = document.getElementById("gridToggle");
	const symmetrySelect = document.getElementById("mirror");
	const widthInput = document.getElementById("canvasCols");
	const heightInput = document.getElementById("canvasRows");
	const resizeButton = document.getElementById("resizeCanvasBtn");
	const openMotifsButton = document.getElementById("openMotifsBtn");
	const closeMotifsButton = document.getElementById("closeMotifsBtn");
	const motifModal = document.getElementById("motifModal");
	const motifModalBackdrop = document.getElementById("motifModalBackdrop");
	const motifPicker = document.getElementById("motifPicker");
	const clearButton = document.getElementById("clearBtn");
	const mapArtToggle = document.getElementById("mapArtViewToggle");
	const colorCountsContainer = document.getElementById("colorCounts");
	const countsSummary = document.getElementById("countsSummary");
	const canvasPanel = document.querySelector(".canvas-panel");

	const storedSize = loadStoredCanvasSize();
	const initialCols = parseDimension(
		storedSize?.cols ?? widthInput?.value,
		COLS
	);
	const initialRows = parseDimension(
		storedSize?.rows ?? heightInput?.value,
		ROWS
	);
	if (widthInput) {
		widthInput.value = String(initialCols);
	}
	if (heightInput) {
		heightInput.value = String(initialRows);
	}

	const project = window.projectCore.createProject({
		cols: initialCols,
		rows: initialRows
	});
	let mapArtViewEnabled = loadStoredMapArtView();
	let currentCellSize = mapArtViewEnabled
		? calculateMapArtCellSize(project.cols, project.rows, canvasPanel)
		: CELL;
	if (mapArtToggle) {
		mapArtToggle.checked = mapArtViewEnabled;
	}
	syncCanvasElementSize(canvas, project.cols, project.rows, currentCellSize);

	if (gridToggle) {
		project.showGrid = gridToggle.checked;
	}

	let symmetryEngine = window.projectCore.createSymmetryEngine({
		cols: project.cols,
		rows: project.rows
	});

	const getSymmetryEngine = () => symmetryEngine;
	const getCellSize = () => currentCellSize;
	const rebuildSymmetryEngine = () => {
		symmetryEngine = window.projectCore.createSymmetryEngine({
			cols: project.cols,
			rows: project.rows
		});
	};

	function updateCanvasScale({ rerender = true } = {}) {
		currentCellSize = mapArtViewEnabled
			? calculateMapArtCellSize(project.cols, project.rows, canvasPanel)
			: CELL;
		syncCanvasElementSize(canvas, project.cols, project.rows, currentCellSize);
		if (rerender) {
			controller.render();
		}
	}

	function resizeCanvas(cols, rows) {
		if (cols === project.cols && rows === project.rows) {
			return true;
		}

		const resized = project.resize(cols, rows, { preserve: false });
		if (!resized) {
			return false;
		}

		updateCanvasScale({ rerender: false });
		rebuildSymmetryEngine();
		motifPickerUI.setActiveMotif(null);
		motifPickerUI.setLibrary({
			motifs: project.templates,
			cols: project.cols,
			rows: project.rows
		});
		toolbarUI?.syncSizeInputs(project.cols, project.rows);
		saveCanvasSize(project.cols, project.rows);
		controller.render();
		return true;
	}

	const colorUsageUI = createColorUsageUI({
		container: colorCountsContainer,
		summary: countsSummary,
		project
	});

	const controller = createCanvasController({
		canvas,
		context,
		project,
		getSymmetryEngine,
		getCellSize,
		onRender: () => {
			colorUsageUI.render();
		},
		onPenToggleEraser: () => {
			const isEraseActive =
				normalizeColor(project.currentColor) === normalizeColor(eraseColor);
			const nextColor = isEraseActive ? lastPaintColor : eraseColor;

			project.currentColor = nextColor;
			if (normalizeColor(nextColor) !== normalizeColor(eraseColor)) {
				lastPaintColor = nextColor;
			}

			paletteUI?.selectByHex(nextColor, { focus: false, notify: false });
		}
	});

	const eraseColor = project.colors[0];
	const normalizeColor = (value) => String(value || "").toUpperCase();
	let lastPaintColor =
		normalizeColor(project.currentColor) === normalizeColor(eraseColor)
			? project.colors[1] || eraseColor
			: project.currentColor;
	let paletteUI = null;

	paletteUI = createPaletteUI({
		palette: project.palette,
		container: paletteContainer,
		onSelect: (color) => {
			project.currentColor = color;
			if (normalizeColor(color) !== normalizeColor(eraseColor)) {
				lastPaintColor = color;
			}
		}
	});

	const motifPickerUI = createMotifPickerUI({
		container: motifPicker,
		motifs: project.templates,
		cols: project.cols,
		rows: project.rows,
		onLoadMotif: (motifId) => {
			const motif = project.templates.find(
				(template) => template.id === motifId
			);
			if (!motif) {
				return false;
			}

			const requiredCols =
				motif.sourceWidth || motif.patternWidth || project.cols;
			const requiredRows =
				motif.sourceHeight || motif.patternHeight || project.rows;
			if (requiredCols > project.cols || requiredRows > project.rows) {
				const targetCols = Math.max(project.cols, requiredCols);
				const targetRows = Math.max(project.rows, requiredRows);
				const confirmed = window.confirm(
					`\"${motif.name}\" is ${requiredCols} x ${requiredRows} cells, but your canvas is ${project.cols} x ${project.rows}. Expand canvas to ${targetCols} x ${targetRows} and load this motif?`
				);
				if (!confirmed) {
					return false;
				}

				if (!resizeCanvas(targetCols, targetRows)) {
					return false;
				}
			}

			if (project.applyTemplate(motifId)) {
				controller.render();
				toolbarUI?.closeMotifsModal();
				return true;
			}

			return false;
		}
	});

	const toolbarUI = createToolbarUI({
		gridToggle,
		mapArtToggle,
		symmetrySelect,
		widthInput,
		heightInput,
		resizeButton,
		clearButton,
		openMotifsButton,
		closeMotifsButton,
		motifModal,
		motifModalBackdrop,
		onOpenMotifs: () => {
			openMotifsButton?.classList.add("is-active");
		},
		onCloseMotifs: () => {
			openMotifsButton?.classList.remove("is-active");
		},
		onToggleGrid: (checked) => {
			project.showGrid = checked;
			controller.render();
		},
		onToggleMapArt: (checked) => {
			mapArtViewEnabled = checked;
			saveMapArtView(mapArtViewEnabled);
			updateCanvasScale();
		},
		onChangeSymmetry: (mode) => {
			project.symmetryMode = mode;
			controller.render();
		},
		onResize: ({ cols, rows }) => {
			resizeCanvas(cols, rows);
		},
		onClear: () => {
			project.clear();
			motifPickerUI.setActiveMotif(null);
			controller.render();
		}
	});

	window.addEventListener("resize", () => {
		if (!mapArtViewEnabled) {
			return;
		}
		updateCanvasScale();
	});

	toolbarUI.syncMapArtToggle(mapArtViewEnabled);

	controller.render();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", bootstrap);
} else {
	bootstrap();
}
