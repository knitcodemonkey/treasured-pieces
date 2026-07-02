const COLS = 19;
const ROWS = 15;
const CELL = 30;

function createPaletteUI({ palette, container, tooltipHost, onSelect }) {
	const tooltip = tooltipHost || document.createElement("div");
	if (!tooltipHost) {
		tooltip.className = "tooltip";
		document.body.appendChild(tooltip);
	}

	const swatches = [];

	function setSelected(selectedSwatch) {
		swatches.forEach((item) => {
			const isActive = item === selectedSwatch;
			item.classList.toggle("sel", isActive);
			item.setAttribute("aria-checked", isActive ? "true" : "false");
			item.tabIndex = isActive ? 0 : -1;
		});
		selectedSwatch?.focus();
	}

	function moveSelection(nextIndex) {
		const boundedIndex = Math.max(0, Math.min(swatches.length - 1, nextIndex));
		const swatch = swatches[boundedIndex];
		if (!swatch) {
			return;
		}

		setSelected(swatch);
		onSelect(palette.colors[boundedIndex].hex);
	}

	palette.colors.forEach((entry, index) => {
		const swatch = document.createElement("button");
		swatch.type = "button";
		swatch.setAttribute("role", "radio");
		swatch.setAttribute("aria-label", `${entry.name} (${entry.hex})`);
		swatch.setAttribute("aria-checked", index === 0 ? "true" : "false");
		swatch.title = `${entry.name} - ${palette.name}`;
		swatch.tabIndex = index === 0 ? 0 : -1;
		swatch.className = `swatch${index === 0 ? " sel" : ""}`;
		swatch.style.background = entry.hex;

		swatch.addEventListener("mouseenter", () => {
			tooltip.innerHTML = `<strong>${entry.name}</strong><div class="sub">${palette.name}</div>`;
			tooltip.style.opacity = "1";
		});

		swatch.addEventListener("mousemove", (event) => {
			tooltip.style.left = `${event.clientX}px`;
			tooltip.style.top = `${event.clientY}px`;
		});

		swatch.addEventListener("mouseleave", () => {
			tooltip.style.opacity = "0";
		});

		swatch.addEventListener("click", () => {
			setSelected(swatch);
			onSelect(entry.hex);
		});

		swatch.addEventListener("keydown", (event) => {
			const currentIndex = swatches.indexOf(swatch);
			switch (event.key) {
				case "ArrowRight":
				case "ArrowDown":
					event.preventDefault();
					moveSelection(currentIndex + 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					event.preventDefault();
					moveSelection(currentIndex - 1);
					break;
				case "Home":
					event.preventDefault();
					moveSelection(0);
					break;
				case "End":
					event.preventDefault();
					moveSelection(swatches.length - 1);
					break;
				case "Enter":
				case " ":
					event.preventDefault();
					setSelected(swatch);
					onSelect(entry.hex);
					break;
				default:
					break;
			}
		});

		container.appendChild(swatch);
		swatches.push(swatch);
	});
}

function createToolbarUI({
	gridToggle,
	symmetrySelect,
	templateSelect,
	applyTemplateButton,
	clearButton,
	onToggleGrid,
	onChangeSymmetry,
	onApplyTemplate,
	onClear
}) {
	gridToggle.addEventListener("change", () => {
		onToggleGrid(gridToggle.checked);
	});

	symmetrySelect.addEventListener("change", () => {
		onChangeSymmetry(symmetrySelect.value);
	});

	if (applyTemplateButton && templateSelect && onApplyTemplate) {
		applyTemplateButton.addEventListener("click", () => {
			onApplyTemplate(templateSelect.value);
		});
	}

	clearButton.addEventListener("click", () => {
		onClear();
	});
}

function createCanvasController({
	canvas,
	context,
	project,
	symmetryEngine,
	cellSize
}) {
	let drawing = false;
	let lastPaintedCell = null;

	function render() {
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
		context.beginPath();
		context.arc(centerX * cellSize, centerY * cellSize, 3, 0, Math.PI * 2);
		context.fill();
	}

	function paintEvent(event) {
		const rect = canvas.getBoundingClientRect();
		const x = Math.floor((event.clientX - rect.left) / cellSize);
		const y = Math.floor((event.clientY - rect.top) / cellSize);

		if (x < 0 || x >= project.cols || y < 0 || y >= project.rows) {
			return;
		}

		if (lastPaintedCell && lastPaintedCell.x === x && lastPaintedCell.y === y) {
			return;
		}

		lastPaintedCell = { x, y };

		for (const point of symmetryEngine.getPoints(x, y, project.symmetryMode)) {
			project.grid[point.y][point.x] = project.currentColor;
		}

		render();
	}

	canvas.addEventListener("pointerdown", (event) => {
		event.preventDefault();
		canvas.setPointerCapture?.(event.pointerId);

		drawing = true;
		lastPaintedCell = null;
		paintEvent(event);
	});

	canvas.addEventListener("pointermove", (event) => {
		event.preventDefault();
		if (drawing) {
			paintEvent(event);
		}
	});

	canvas.addEventListener("pointercancel", () => {
		drawing = false;
		lastPaintedCell = null;
	});

	window.addEventListener("pointerup", () => {
		drawing = false;
		lastPaintedCell = null;
	});

	return { render };
}

async function updateVersionLabel(versionLabel) {
	const fallbackVersion =
		document.body.dataset.version ||
		versionLabel?.textContent?.trim() ||
		"v0.0.0";

	if (!versionLabel) {
		return fallbackVersion;
	}

	try {
		const response = await fetch(
			"https://api.github.com/repos/knitcodemonkey/treasured-pieces/releases?per_page=5"
		);
		if (!response.ok) {
			throw new Error("Release lookup failed");
		}

		const releases = await response.json();
		const latestTag =
			releases.find((release) => release.tag_name)?.tag_name || null;
		const nextVersion = latestTag || fallbackVersion;
		versionLabel.textContent = nextVersion;
		return nextVersion;
	} catch (error) {
		versionLabel.textContent = fallbackVersion;
		return fallbackVersion;
	}
}

function bootstrap() {
	const versionLabel = document.getElementById("appVersion");
	if (versionLabel) {
		versionLabel.textContent =
			document.body.dataset.version || versionLabel.textContent || "v0.0.0";
	}

	void updateVersionLabel(versionLabel);

	const project = window.projectCore.createProject({
		cols: COLS,
		rows: ROWS
	});
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const paletteContainer = document.getElementById("palette");
	const gridToggle = document.getElementById("gridToggle");
	const symmetrySelect = document.getElementById("mirror");
	const templateSelect = document.getElementById("templateSelect");
	const templateHint = document.getElementById("templateHint");
	const applyTemplateButton = document.getElementById("applyTemplateBtn");
	const clearButton = document.getElementById("clearBtn");
	const symmetryEngine = window.projectCore.createSymmetryEngine({
		cols: project.cols,
		rows: project.rows
	});
	const controller = createCanvasController({
		canvas,
		context,
		project,
		symmetryEngine,
		cellSize: CELL
	});

	createPaletteUI({
		palette: project.palette,
		container: paletteContainer,
		onSelect: (color) => {
			project.currentColor = color;
		}
	});

	if (templateSelect) {
		const blankOption = document.createElement("option");
		blankOption.value = "";
		blankOption.textContent = "Blank";
		blankOption.dataset.description = "Start from an empty canvas.";
		templateSelect.appendChild(blankOption);

		project.templates.forEach((template) => {
			const option = document.createElement("option");
			option.value = template.id;
			option.textContent = template.name;
			option.dataset.description = template.description;
			templateSelect.appendChild(option);
		});

		const syncTemplateHint = () => {
			const selected = templateSelect.selectedOptions[0];
			const description =
				selected?.dataset?.description || "Select a starter design.";

			if (templateHint) {
				templateHint.textContent = description;
			}
			templateSelect.title = description;
			if (applyTemplateButton) {
				applyTemplateButton.title = description;
			}
		};

		templateSelect.addEventListener("change", syncTemplateHint);
		syncTemplateHint();
	}

	createToolbarUI({
		gridToggle,
		symmetrySelect,
		templateSelect,
		applyTemplateButton,
		clearButton,
		onToggleGrid: (checked) => {
			project.showGrid = checked;
			controller.render();
		},
		onChangeSymmetry: (mode) => {
			project.symmetryMode = mode;
			controller.render();
		},
		onApplyTemplate: (templateId) => {
			if (!templateId) {
				project.clear();
				controller.render();
				return;
			}

			if (project.applyTemplate(templateId)) {
				controller.render();
			}
		},
		onClear: () => {
			project.clear();
			controller.render();
		}
	});

	controller.render();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", bootstrap);
} else {
	bootstrap();
}
