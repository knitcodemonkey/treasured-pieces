const COLS = 19;
const ROWS = 15;
const CELL = 30;

function bootstrap() {
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
