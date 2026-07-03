// Generated from motif definitions split by category.
const BORDER_MOTIFS = [
	{
			id: "border-beads",
			name: "Border Beads",
			category: "border",
			placement: "border-repeat",
			description: "Repeating bead accents around the canvas edge.",
			patternWidth: 3,
			patternHeight: 2,
			hasCornerCompanions: true,
			cornerCells: {
				topLeft: [
					{ dx: 0, dy: 0, colorId: "yellow" },
					{ dx: 1, dy: 1, colorId: "orange" }
				],
				topRight: [
					{ dx: 1, dy: 0, colorId: "yellow" },
					{ dx: 0, dy: 1, colorId: "orange" }
				],
				bottomLeft: [
					{ dx: 0, dy: 1, colorId: "yellow" },
					{ dx: 1, dy: 0, colorId: "orange" }
				],
				bottomRight: [
					{ dx: 1, dy: 1, colorId: "yellow" },
					{ dx: 0, dy: 0, colorId: "orange" }
				]
			},
			cells: [
				{ dx: 1, dy: 0, colorId: "yellow" },
				{ dx: 0, dy: 1, colorId: "orange" },
				{ dx: 2, dy: 1, colorId: "orange" }
			]
		},
	{
			id: "border-steps",
			name: "Border Steps",
			category: "border",
			placement: "border-repeat",
			description: "A stepped frame motif that tiles along each edge.",
			patternWidth: 4,
			patternHeight: 2,
			cells: [
				{ dx: 0, dy: 0, colorId: "brown" },
				{ dx: 1, dy: 0, colorId: "orange" },
				{ dx: 2, dy: 0, colorId: "yellow" },
				{ dx: 3, dy: 0, colorId: "white" },
				{ dx: 1, dy: 1, colorId: "orange" },
				{ dx: 2, dy: 1, colorId: "yellow" }
			]
		},
	{
			id: "border-celtic-knot",
			name: "Celtic Knot Border",
			category: "border",
			placement: "border-repeat",
			description: "Interlaced knot border with matched corner turns.",
			patternWidth: 4,
			patternHeight: 2,
			hasCornerCompanions: true,
			cornerCells: {
				topLeft: [
					{ dx: 0, dy: 0, colorId: "light_gray" },
					{ dx: 1, dy: 0, colorId: "brown" },
					{ dx: 0, dy: 1, colorId: "brown" },
					{ dx: 1, dy: 1, colorId: "yellow" }
				],
				topRight: [
					{ dx: 1, dy: 0, colorId: "light_gray" },
					{ dx: 0, dy: 0, colorId: "brown" },
					{ dx: 1, dy: 1, colorId: "brown" },
					{ dx: 0, dy: 1, colorId: "yellow" }
				],
				bottomLeft: [
					{ dx: 0, dy: 1, colorId: "light_gray" },
					{ dx: 1, dy: 1, colorId: "brown" },
					{ dx: 0, dy: 0, colorId: "brown" },
					{ dx: 1, dy: 0, colorId: "yellow" }
				],
				bottomRight: [
					{ dx: 1, dy: 1, colorId: "light_gray" },
					{ dx: 0, dy: 1, colorId: "brown" },
					{ dx: 1, dy: 0, colorId: "brown" },
					{ dx: 0, dy: 0, colorId: "yellow" }
				]
			},
			cells: [
				{ dx: 0, dy: 0, colorId: "brown" },
				{ dx: 1, dy: 0, colorId: "yellow" },
				{ dx: 2, dy: 0, colorId: "brown" },
				{ dx: 3, dy: 0, colorId: "light_gray" },
				{ dx: 1, dy: 1, colorId: "brown" },
				{ dx: 2, dy: 1, colorId: "yellow" }
			]
		},
	{
			id: "border-diamonds",
			name: "Diamond Link Border",
			category: "border",
			placement: "border-repeat",
			description: "Linked diamond tiles with matched corner caps.",
			patternWidth: 4,
			patternHeight: 2,
			hasCornerCompanions: true,
			cornerCells: {
				topLeft: [
					{ dx: 0, dy: 0, colorId: "orange" },
					{ dx: 1, dy: 0, colorId: "yellow" },
					{ dx: 0, dy: 1, colorId: "yellow" }
				],
				topRight: [
					{ dx: 1, dy: 0, colorId: "orange" },
					{ dx: 0, dy: 0, colorId: "yellow" },
					{ dx: 1, dy: 1, colorId: "yellow" }
				],
				bottomLeft: [
					{ dx: 0, dy: 1, colorId: "orange" },
					{ dx: 1, dy: 1, colorId: "yellow" },
					{ dx: 0, dy: 0, colorId: "yellow" }
				],
				bottomRight: [
					{ dx: 1, dy: 1, colorId: "orange" },
					{ dx: 0, dy: 1, colorId: "yellow" },
					{ dx: 1, dy: 0, colorId: "yellow" }
				]
			},
			cells: [
				{ dx: 0, dy: 0, colorId: "brown" },
				{ dx: 1, dy: 0, colorId: "orange" },
				{ dx: 2, dy: 0, colorId: "yellow" },
				{ dx: 3, dy: 0, colorId: "orange" },
				{ dx: 1, dy: 1, colorId: "yellow" },
				{ dx: 2, dy: 1, colorId: "brown" }
			]
		},
	{
			id: "border-vine",
			name: "Vine Border",
			category: "border",
			placement: "border-repeat",
			description: "A soft leafy rhythm for lighter edge framing.",
			patternWidth: 3,
			patternHeight: 2,
			cells: [
				{ dx: 0, dy: 0, colorId: "green" },
				{ dx: 1, dy: 0, colorId: "lime" },
				{ dx: 2, dy: 0, colorId: "green" },
				{ dx: 1, dy: 1, colorId: "yellow" }
			]
		},
	{
			id: "border-rope",
			name: "Rope Border",
			category: "border",
			placement: "border-repeat",
			description: "Twisted rope edge with intentional corner knots.",
			patternWidth: 5,
			patternHeight: 2,
			hasCornerCompanions: true,
			cornerCells: {
				topLeft: [
					{ dx: 0, dy: 0, colorId: "brown" },
					{ dx: 1, dy: 0, colorId: "orange" },
					{ dx: 0, dy: 1, colorId: "orange" }
				],
				topRight: [
					{ dx: 1, dy: 0, colorId: "brown" },
					{ dx: 0, dy: 0, colorId: "orange" },
					{ dx: 1, dy: 1, colorId: "orange" }
				],
				bottomLeft: [
					{ dx: 0, dy: 1, colorId: "brown" },
					{ dx: 1, dy: 1, colorId: "orange" },
					{ dx: 0, dy: 0, colorId: "orange" }
				],
				bottomRight: [
					{ dx: 1, dy: 1, colorId: "brown" },
					{ dx: 0, dy: 1, colorId: "orange" },
					{ dx: 1, dy: 0, colorId: "orange" }
				]
			},
			cells: [
				{ dx: 0, dy: 0, colorId: "brown" },
				{ dx: 1, dy: 0, colorId: "orange" },
				{ dx: 2, dy: 0, colorId: "brown" },
				{ dx: 3, dy: 0, colorId: "orange" },
				{ dx: 4, dy: 0, colorId: "brown" },
				{ dx: 1, dy: 1, colorId: "yellow" },
				{ dx: 3, dy: 1, colorId: "yellow" }
			]
		}
];

if (typeof window !== "undefined") {
	window.projectCoreBorderMotifs = {
		BORDER_MOTIFS
	};
}

if (typeof module !== "undefined") {
	module.exports = {
		BORDER_MOTIFS
	};
}
