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

async function clickCanvasCell(page, cellX, cellY) {
	const canvas = page.locator("#canvas");
	const box = await canvas.boundingBox();
	if (!box) {
		throw new Error("Canvas bounding box not found");
	}
	const point = await getCellCenter(page, cellX, cellY);
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

async function getCanvasState(page) {
	return page.evaluate(() => {
		const canvas = document.getElementById("canvas");
		const cols = Number(document.getElementById("canvasCols")?.value || 0);
		const rows = Number(document.getElementById("canvasRows")?.value || 0);
		return {
			width: canvas.width,
			height: canvas.height,
			cols,
			rows,
			cellWidth: cols > 0 ? canvas.width / cols : 0,
			cellHeight: rows > 0 ? canvas.height / rows : 0
		};
	});
}

async function getCellCenter(page, cellX, cellY) {
	return page.evaluate(
		({ cellX, cellY }) => {
			const canvas = document.getElementById("canvas");
			const cols = Number(document.getElementById("canvasCols")?.value || 1);
			const rows = Number(document.getElementById("canvasRows")?.value || 1);
			const cellWidth = canvas.width / cols;
			const cellHeight = canvas.height / rows;
			const cellSize = Math.min(cellWidth, cellHeight);
			return {
				x: Math.floor(cellX * cellSize + cellSize / 2),
				y: Math.floor(cellY * cellSize + cellSize / 2)
			};
		},
		{ cellX, cellY }
	);
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
		const paintedPoint = await getCellCenter(page, 1, 1);
		const painted = await colorAt(page, paintedPoint.x, paintedPoint.y);
		assert.notStrictEqual(
			painted,
			"#f9fffe",
			"Cell should be painted, not default white"
		);

		// Flow 2: load a motif and verify center changed from default.
		await page.click("#openMotifsBtn");
		await page.click("#motifPicker .motif-option[data-motif-id='sun']");
		const center = await getCellCenter(page, 9, 7);
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
		const source = await getCellCenter(page, 2, 3);
		const mirrored = await getCellCenter(page, 16, 11);
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
		const resizedCorner = await getCellCenter(page, 23, 11);
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

		// Flow 10: Map Art View forces 128x128 and keeps non-map size preference.
		const storedBeforeMapArt = await page.evaluate(() => {
			return window.localStorage.getItem("treasuredpieces.canvasSize");
		});
		assert.strictEqual(
			storedBeforeMapArt,
			JSON.stringify({ cols: 24, rows: 26 }),
			"Expected non-map canvas preference before entering Map Art View"
		);

		const normalMapState = await getCanvasState(page);
		assert.strictEqual(
			normalMapState.cols,
			24,
			"Normal view should start from stored non-map width"
		);
		assert.strictEqual(
			normalMapState.rows,
			26,
			"Normal view should start from stored non-map height"
		);
		assert.strictEqual(
			normalMapState.cellWidth,
			normalMapState.cellHeight,
			"Normal view cells should stay square"
		);

		await page.check("#mapArtViewToggle");
		const mapArtState = await getCanvasState(page);
		assert.strictEqual(
			mapArtState.cols,
			128,
			"Map Art View should force canvas width to 128"
		);
		assert.strictEqual(
			mapArtState.rows,
			128,
			"Map Art View should force canvas height to 128"
		);
		assert.ok(
			mapArtState.cellWidth < 30,
			"Map Art View should reduce cell size for large canvases"
		);
		assert.strictEqual(
			Math.round(mapArtState.cellWidth * 1000),
			Math.round(mapArtState.cellHeight * 1000),
			"Map Art View should keep cells square"
		);
		const mapArtCorner = await getCellCenter(page, 0, 0);
		const mapArtBackground = await colorAt(
			page,
			mapArtCorner.x,
			mapArtCorner.y
		);
		assert.strictEqual(
			mapArtBackground,
			"#1d1d21",
			"Map Art View default background should be black"
		);
		const mapArtCountRows = await page
			.locator("#colorCounts .count-item")
			.count();
		assert.strictEqual(
			mapArtCountRows,
			0,
			"Map Art View should exclude default black background from material counts"
		);
		const mapArtSummary = await page.locator("#countsSummary").innerText();
		assert.strictEqual(
			mapArtSummary,
			"0 colored cells • 16384 total",
			"Map Art summary should not count default black background as needed color"
		);

		const persistedMapView = await page.evaluate(() => {
			return window.localStorage.getItem("treasuredpieces.mapArtView");
		});
		assert.strictEqual(
			persistedMapView,
			"1",
			"Map Art View toggle should persist enabled state"
		);
		const storedDuringMapArt = await page.evaluate(() => {
			return window.localStorage.getItem("treasuredpieces.canvasSize");
		});
		assert.strictEqual(
			storedDuringMapArt,
			JSON.stringify({ cols: 24, rows: 26 }),
			"Map Art View should not overwrite stored non-map canvas size"
		);

		await page.uncheck("#mapArtViewToggle");
		const restoredFromStorageState = await getCanvasState(page);
		assert.strictEqual(
			restoredFromStorageState.cols,
			24,
			"Turning off Map Art View should restore stored canvas width"
		);
		assert.strictEqual(
			restoredFromStorageState.rows,
			26,
			"Turning off Map Art View should restore stored canvas height"
		);

		await page.reload({ waitUntil: "networkidle" });
		assert.strictEqual(
			await page.isChecked("#mapArtViewToggle"),
			false,
			"Map Art View should restore disabled state after reload"
		);

		const reloadedMapState = await getCanvasState(page);
		assert.strictEqual(
			reloadedMapState.cols,
			24,
			"Reload should restore stored non-map canvas width"
		);
		assert.strictEqual(
			reloadedMapState.rows,
			26,
			"Reload should restore stored non-map canvas height"
		);
		assert.strictEqual(
			Math.round(reloadedMapState.cellWidth * 1000),
			Math.round(reloadedMapState.cellHeight * 1000),
			"Reloaded normal view should keep cells square"
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
