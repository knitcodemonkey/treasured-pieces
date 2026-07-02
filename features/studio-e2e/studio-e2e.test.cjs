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

		// Flow 2: apply a template and verify center changed from default.
		await page.selectOption("#templateSelect", "sun");
		await page.click("#applyTemplateBtn");
		const center = centerOfCell(9, 7);
		const centerColor = await colorAt(page, center.x, center.y);
		assert.notStrictEqual(
			centerColor,
			"#f9fffe",
			"Template should change center cell"
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

		console.log("studio-e2e tests passed");
	} finally {
		await browser.close();
	}
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
