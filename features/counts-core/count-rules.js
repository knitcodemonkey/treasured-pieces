(function (globalScope) {
	function normalizeColor(value) {
		return String(value || "").toUpperCase();
	}

	function buildColorCounts(project) {
		const counts = new Map(
			(project?.palette?.colors || []).map((entry) => [
				normalizeColor(entry.hex),
				0
			])
		);

		for (let y = 0; y < (project?.rows || 0); y += 1) {
			for (let x = 0; x < (project?.cols || 0); x += 1) {
				const key = normalizeColor(project.grid[y][x]);
				counts.set(key, (counts.get(key) || 0) + 1);
			}
		}

		return counts;
	}

	function createColorUsageSnapshot({ project, excludedHex = null }) {
		const counts = buildColorCounts(project);
		const excludedColor = excludedHex ? normalizeColor(excludedHex) : null;

		const entries = (project?.palette?.colors || [])
			.map((entry) => {
				const count = counts.get(normalizeColor(entry.hex)) || 0;
				return {
					...entry,
					count
				};
			})
			.filter((entry) => {
				const entryColor = normalizeColor(entry.hex);
				if (excludedColor && entryColor === excludedColor) {
					return false;
				}
				return entry.count > 0;
			})
			.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

		const defaultColor = normalizeColor(project?.palette?.colors?.[0]?.hex);
		const totalCells = (project?.cols || 0) * (project?.rows || 0);
		const excludedCount = excludedColor
			? counts.get(excludedColor) || 0
			: counts.get(defaultColor) || 0;

		return {
			entries,
			totalCells,
			coloredCount: totalCells - excludedCount
		};
	}

	const countsCore = {
		normalizeColor,
		buildColorCounts,
		createColorUsageSnapshot
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = countsCore;
	}

	if (globalScope) {
		globalScope.countsCore = countsCore;
	}
})(typeof window !== "undefined" ? window : globalThis);
