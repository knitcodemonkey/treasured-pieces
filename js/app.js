const COLS = 19;
const ROWS = 15;
const CELL = 30;

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

	const project = window.projectModule.createProject({
		cols: COLS,
		rows: ROWS
	});
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const paletteContainer = document.getElementById("palette");
	const gridToggle = document.getElementById("gridToggle");
	const symmetrySelect = document.getElementById("mirror");
	const clearButton = document.getElementById("clearBtn");
	const symmetryEngine = window.projectModule.createSymmetryEngine({
		cols: project.cols,
		rows: project.rows
	});
	const controller = window.createCanvasController({
		canvas,
		context,
		project,
		symmetryEngine
	});

	window.createPaletteUI({
		palette: project.palette,
		container: paletteContainer,
		onSelect: (color) => {
			project.currentColor = color;
		}
	});

	window.createToolbarUI({
		gridToggle,
		symmetrySelect,
		clearButton,
		onToggleGrid: (checked) => {
			project.showGrid = checked;
			controller.render();
		},
		onChangeSymmetry: (mode) => {
			project.symmetryMode = mode;
			controller.render();
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
