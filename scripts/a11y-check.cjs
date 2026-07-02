const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;

async function run() {
	const url = process.argv[2] || "http://127.0.0.1:4173/index.html";
	const tags = process.argv.slice(3);

	if (tags.length === 0) {
		console.error("Usage: node scripts/a11y-check.cjs <url> <tag...>");
		process.exit(2);
	}

	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "networkidle" });

	const results = await new AxeBuilder({ page }).withTags(tags).analyze();
	await browser.close();

	if (results.violations.length > 0) {
		console.error(`Accessibility violations for tags: ${tags.join(", ")}`);
		for (const violation of results.violations) {
			console.error(`\n- ${violation.id}: ${violation.help}`);
			console.error(`  Impact: ${violation.impact || "unknown"}`);
			for (const node of violation.nodes) {
				const target =
					node.target && node.target.length
						? node.target.join(" ")
						: "(no target)";
				console.error(`  Target: ${target}`);
			}
		}
		process.exit(1);
	}

	console.log(`No accessibility violations found for tags: ${tags.join(", ")}`);
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
