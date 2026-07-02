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

	function moveSelection(currentIndex, nextIndex) {
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
					moveSelection(currentIndex, currentIndex + 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					event.preventDefault();
					moveSelection(currentIndex, currentIndex - 1);
					break;
				case "Home":
					event.preventDefault();
					moveSelection(currentIndex, 0);
					break;
				case "End":
					event.preventDefault();
					moveSelection(currentIndex, swatches.length - 1);
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

	return { tooltip };
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

if (typeof window !== "undefined") {
	window.createPaletteUI = createPaletteUI;
	window.createToolbarUI = createToolbarUI;
}
