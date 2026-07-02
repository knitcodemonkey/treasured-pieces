function createCanvasController({ canvas, context, project, symmetryEngine }) {
	let drawing = false;
	let lastPaintedCell = null;

	function render() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (let y = 0; y < project.rows; y += 1) {
			for (let x = 0; x < project.cols; x += 1) {
				context.fillStyle = project.grid[y][x];
				context.fillRect(x * 30, y * 30, 30, 30);
			}
		}

		if (project.showGrid) {
			context.strokeStyle = "#777";
			context.lineWidth = 1;
			for (let x = 0; x <= project.cols; x += 1) {
				context.beginPath();
				context.moveTo(x * 30 + 0.5, 0);
				context.lineTo(x * 30 + 0.5, project.rows * 30);
				context.stroke();
			}
			for (let y = 0; y <= project.rows; y += 1) {
				context.beginPath();
				context.moveTo(0, y * 30 + 0.5);
				context.lineTo(project.cols * 30, y * 30 + 0.5);
				context.stroke();
			}
		}

		context.strokeStyle = "rgba(255,215,0,.45)";
		context.beginPath();
		context.moveTo(9.5 * 30, 0);
		context.lineTo(9.5 * 30, project.rows * 30);
		context.stroke();
		context.beginPath();
		context.moveTo(0, 7.5 * 30);
		context.lineTo(project.cols * 30, 7.5 * 30);
		context.stroke();
		context.fillStyle = "gold";
		context.beginPath();
		context.arc(9.5 * 30, 7.5 * 30, 3, 0, Math.PI * 2);
		context.fill();
	}

	function paintEvent(event) {
		const rect = canvas.getBoundingClientRect();
		const x = Math.floor((event.clientX - rect.left) / 30);
		const y = Math.floor((event.clientY - rect.top) / 30);

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

	return { render, paintEvent };
}

if (typeof window !== "undefined") {
	window.createCanvasController = createCanvasController;
}
