function createPaletteUI({ palette, container, tooltipHost, onSelect }) {
	const tooltip = tooltipHost || document.createElement("div");
	if (!tooltipHost) {
		tooltip.className = "tooltip";
		document.body.appendChild(tooltip);
	}

	const swatches = [];

	palette.colors.forEach((entry, index) => {
		const swatch = document.createElement("div");
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
			swatches.forEach((item) => item.classList.remove("sel"));
			swatch.classList.add("sel");
			onSelect(entry.hex);
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
