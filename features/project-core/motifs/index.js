// Aggregates motif definitions split by category.
const SINGLE_MOTIFS_FROM_MODULE = (() => {
	if (typeof module !== "undefined" && module.exports) {
		return require("./single-motifs").SINGLE_MOTIFS;
	}
	if (typeof window !== "undefined") {
		return window.projectCoreSingleMotifs?.SINGLE_MOTIFS || [];
	}
	return [];
})();

const BORDER_MOTIFS_FROM_MODULE = (() => {
	if (typeof module !== "undefined" && module.exports) {
		return require("./border-motifs").BORDER_MOTIFS;
	}
	if (typeof window !== "undefined") {
		return window.projectCoreBorderMotifs?.BORDER_MOTIFS || [];
	}
	return [];
})();

const MOTIF_TEMPLATE_DEFINITIONS = [
	...SINGLE_MOTIFS_FROM_MODULE,
	...BORDER_MOTIFS_FROM_MODULE
];

if (typeof window !== "undefined") {
	window.projectCoreMotifs = {
		TEMPLATE_DEFINITIONS: MOTIF_TEMPLATE_DEFINITIONS
	};
}

if (typeof module !== "undefined") {
	module.exports = {
		TEMPLATE_DEFINITIONS: MOTIF_TEMPLATE_DEFINITIONS
	};
}
