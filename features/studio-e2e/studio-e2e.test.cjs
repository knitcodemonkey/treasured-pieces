const assert = require("assert");
const { chromium } = require("playwright");

function colorAt(page, x, y) {
	return page.evaluate(
		({ x, y }) => {
			const canvas = document.getElementById("canvas");
			const ctx = canvas.getContext("2d");
			const pixel = ctx.getImageData(x, y, 1, 1).data;
			return `#${[pixel[0], pixel[1], pixel[2]].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
		},
		{ x, y }
	);
}

function centerOfCell(cellX, cellY, cellSize = 30) {
	return {
		x: cellX * cellSize + Math.floor(cellSize / 2),
		y: cellY * cellSize + Math.floor(cellSize / 2)
	};
}

async function clickCanvasCell(page, cellX, cellY) {
	const canvas = page.locator("#canvas");
	const box = await canvas.boundingBox();
	if (!box) {
		throw new Error("Canvas bounding box not found");
	}
	const point = centerOfCell(cellX, cellY);
	await page.mouse.click(box.x + point.x, box.y + point.y);
}

async function selectSwatch(page, index) {
	await page.locator("#palette .swatch").nth(index).click();
}

async function getCanvasDimensions(page) {
	return page.evaluate(() => {
		const canvas = document.getElementById("canvas");
		return { width: canvas.width, height: canvas.height };
	});
}

async function run() {
	const baseUrl = process.argv[2] || "http://127.0.0.1:4173/index.html";
	const browser = await chromium.launch();
	const page = await browser.newPage({
		viewport: { width: 1280, height: 900 }
	});

	try {
		await page.goto(baseUrl, { waitUntil: "networkidle" });

		// Flow 1: select a color and paint a cell.
		await selectSwatch(page, 5); // red-ish swatch
		await clickCanvasCell(page, 1, 1);
		const painted = await colorAt(page, 45, 45);
		assert.notStrictEqual(
			painted,
			"#f9fffe",
			"Cell should be painted, not default white"
		);

		// Flow 2: load a motif and verify center changed from default.
		await page.click("#openMotifsBtn");
		await page.click("#motifPicker .motif-option[data-motif-id='sun']");
		const center = centerOfCell(9, 7);
		const centerColor = await colorAt(page, center.x, center.y);
		assert.notStrictEqual(
			centerColor,
			"#f9fffe",
			"Motif should change center cell"
		);

		// Flow 3: symmetry paint should mirror across center in 180 mode.
		await page.selectOption("#mirror", "180°");
		await selectSwatch(page, 6); // orange swatch
		await clickCanvasCell(page, 2, 3);
		const source = centerOfCell(2, 3);
		const mirrored = centerOfCell(16, 11);
		const sourceColor = await colorAt(page, source.x, source.y);
		const mirrorColor = await colorAt(page, mirrored.x, mirrored.y);
		assert.strictEqual(
			sourceColor,
			mirrorColor,
			"Symmetry paint should mirror source and target cells"
		);

		// Flow 4: clear should return painted cells to default.
		await page.click("#clearBtn");
		const clearedSource = await colorAt(page, source.x, source.y);
		assert.strictEqual(
			clearedSource,
			"#f9fffe",
			"Clear should reset painted cells"
		);

		// Flow 5: counts panel can collapse/expand, and zero-count rows are hidden.
		const countsAccordion = page.locator(".counts-accordion");
		assert.strictEqual(
			await countsAccordion.evaluate((el) => el.open),
			true,
			"Build Counts accordion should start expanded"
		);
		await page.click(".counts-accordion .counts-header");
		assert.strictEqual(
			await countsAccordion.evaluate((el) => el.open),
			false,
			"Build Counts accordion should collapse when toggled"
		);
		await page.click(".counts-accordion .counts-header");
		assert.strictEqual(
			await countsAccordion.evaluate((el) => el.open),
			true,
			"Build Counts accordion should expand when toggled again"
		);

		const countRows = await page.locator("#colorCounts .count-item").count();
		assert.strictEqual(
			countRows,
			1,
			"Only non-zero color counts should be shown after clear"
		);

		// Flow 6: resize canvas dimensions and verify new drawing bounds.
		await page.fill("#canvasCols", "24");
		await page.fill("#canvasRows", "12");
		await page.click("#resizeCanvasBtn");

		const dimensions = await getCanvasDimensions(page);
		assert.strictEqual(dimensions.width, 24 * 30, "Canvas width should resize");
		assert.strictEqual(
			dimensions.height,
			12 * 30,
			"Canvas height should resize"
		);

		await selectSwatch(page, 7); // yellow swatch
		await clickCanvasCell(page, 23, 11);
		const resizedCorner = centerOfCell(23, 11);
		const resizedColor = await colorAt(page, resizedCorner.x, resizedCorner.y);
		assert.notStrictEqual(
			resizedColor,
			"#f9fffe",
			"Painting should work at the new bottom-right corner"
		);

		// Flow 7: oversized motif prompt can be canceled and leaves canvas unchanged.
		await page.click("#openMotifsBtn");
		page.once("dialog", (dialog) => dialog.dismiss());
		await page.click(
			"#motifPicker .motif-option[data-motif-id='full-window-moon-arcana']"
		);
		const cancelledDimensions = await getCanvasDimensions(page);
		assert.strictEqual(
			cancelledDimensions.width,
			24 * 30,
			"Canceling oversize motif resize should keep canvas width"
		);
		assert.strictEqual(
			cancelledDimensions.height,
			12 * 30,
			"Canceling oversize motif resize should keep canvas height"
		);

		// Flow 8: oversized motif prompt accepts resize and applies motif.
		page.once("dialog", (dialog) => dialog.accept());
		await page.click(
			"#motifPicker .motif-option[data-motif-id='full-window-moon-arcana']"
		);
		const expandedDimensions = await getCanvasDimensions(page);
		assert.strictEqual(
			expandedDimensions.width,
			24 * 30,
			"Accepted oversize motif resize should preserve current width when already large enough"
		);
		assert.strictEqual(
			expandedDimensions.height,
			26 * 30,
			"Accepted oversize motif resize should expand canvas height"
		);

		// Flow 9: persisted canvas size restores after reload.
		await page.reload({ waitUntil: "networkidle" });
		const persistedDimensions = await getCanvasDimensions(page);
		assert.strictEqual(
			persistedDimensions.width,
			24 * 30,
			"Reload should restore saved canvas width"
		);
		assert.strictEqual(
			persistedDimensions.height,
			26 * 30,
			"Reload should restore saved canvas height"
		);
		assert.strictEqual(
			await page.inputValue("#canvasCols"),
			"24",
			"Reload should restore saved width input"
		);
		assert.strictEqual(
			await page.inputValue("#canvasRows"),
			"26",
			"Reload should restore saved height input"
		);

		console.log("studio-e2e tests passed");
	} finally {
		await browser.close();
	}
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
