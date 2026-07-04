(function (globalScope) {
	function createColorUsageUI({
		container,
		summary,
		project,
		isMapArtViewEnabled,
		getMapArtBackgroundHex
	}) {
		if (!container || !project?.palette?.colors) {
			return { render: () => {} };
		}

		const countsCore = globalScope?.countsCore;
		if (!countsCore?.createColorUsageSnapshot) {
			return { render: () => {} };
		}

		function render() {
			const mapArtEnabled = Boolean(isMapArtViewEnabled?.());
			const excludedHex = mapArtEnabled ? getMapArtBackgroundHex?.() : null;
			const snapshot = countsCore.createColorUsageSnapshot({
				project,
				excludedHex
			});

			if (summary) {
				summary.textContent = `${snapshot.coloredCount} colored cells • ${snapshot.totalCells} total`;
			}

			container.innerHTML = "";
			for (const entry of snapshot.entries) {
				const item = document.createElement("div");
				item.className = "count-item";

				const swatch = document.createElement("span");
				swatch.className = "count-swatch";
				swatch.style.background = entry.hex;

				const name = document.createElement("span");
				name.className = "count-name";
				name.textContent = entry.name;

				const value = document.createElement("span");
				value.className = "count-value";
				value.textContent = String(entry.count);

				item.appendChild(swatch);
				item.appendChild(name);
				item.appendChild(value);
				container.appendChild(item);
			}
		}

		return { render };
	}

	const countsUI = { createColorUsageUI };

	if (typeof module !== "undefined" && module.exports) {
		module.exports = countsUI;
	}

	if (globalScope) {
		globalScope.countsUI = countsUI;
	}
})(typeof window !== "undefined" ? window : globalThis);
