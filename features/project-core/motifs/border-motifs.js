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
		description: "A stepped frame motif with neutral stone and ember accents.",
		patternWidth: 4,
		patternHeight: 2,
		cells: [
			{ dx: 0, dy: 0, colorId: "black" },
			{ dx: 1, dy: 0, colorId: "gray" },
			{ dx: 2, dy: 0, colorId: "red" },
			{ dx: 3, dy: 0, colorId: "white" },
			{ dx: 1, dy: 1, colorId: "light_gray" },
			{ dx: 2, dy: 1, colorId: "red" }
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
		description: "Linked diamond tiles with cool blue corner caps.",
		patternWidth: 4,
		patternHeight: 2,
		hasCornerCompanions: true,
		cornerCells: {
			topLeft: [
				{ dx: 0, dy: 0, colorId: "blue" },
				{ dx: 1, dy: 0, colorId: "light_blue" },
				{ dx: 0, dy: 1, colorId: "cyan" }
			],
			topRight: [
				{ dx: 1, dy: 0, colorId: "blue" },
				{ dx: 0, dy: 0, colorId: "light_blue" },
				{ dx: 1, dy: 1, colorId: "cyan" }
			],
			bottomLeft: [
				{ dx: 0, dy: 1, colorId: "blue" },
				{ dx: 1, dy: 1, colorId: "light_blue" },
				{ dx: 0, dy: 0, colorId: "cyan" }
			],
			bottomRight: [
				{ dx: 1, dy: 1, colorId: "blue" },
				{ dx: 0, dy: 1, colorId: "light_blue" },
				{ dx: 1, dy: 0, colorId: "cyan" }
			]
		},
		cells: [
			{ dx: 0, dy: 0, colorId: "blue" },
			{ dx: 1, dy: 0, colorId: "light_blue" },
			{ dx: 2, dy: 0, colorId: "cyan" },
			{ dx: 3, dy: 0, colorId: "light_blue" },
			{ dx: 1, dy: 1, colorId: "cyan" },
			{ dx: 2, dy: 1, colorId: "blue" }
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
		description: "Twisted rope edge rendered as cool amethyst cords.",
		patternWidth: 5,
		patternHeight: 2,
		hasCornerCompanions: true,
		cornerCells: {
			topLeft: [
				{ dx: 0, dy: 0, colorId: "purple" },
				{ dx: 1, dy: 0, colorId: "magenta" },
				{ dx: 0, dy: 1, colorId: "magenta" }
			],
			topRight: [
				{ dx: 1, dy: 0, colorId: "purple" },
				{ dx: 0, dy: 0, colorId: "magenta" },
				{ dx: 1, dy: 1, colorId: "magenta" }
			],
			bottomLeft: [
				{ dx: 0, dy: 1, colorId: "purple" },
				{ dx: 1, dy: 1, colorId: "magenta" },
				{ dx: 0, dy: 0, colorId: "magenta" }
			],
			bottomRight: [
				{ dx: 1, dy: 1, colorId: "purple" },
				{ dx: 0, dy: 1, colorId: "magenta" },
				{ dx: 1, dy: 0, colorId: "magenta" }
			]
		},
		cells: [
			{ dx: 0, dy: 0, colorId: "purple" },
			{ dx: 1, dy: 0, colorId: "magenta" },
			{ dx: 2, dy: 0, colorId: "purple" },
			{ dx: 3, dy: 0, colorId: "magenta" },
			{ dx: 4, dy: 0, colorId: "purple" },
			{ dx: 1, dy: 1, colorId: "light_blue" },
			{ dx: 3, dy: 1, colorId: "light_blue" }
		]
	},
	{
		id: "border-night-sky",
		name: "Night Sky Border",
		category: "border",
		placement: "border-repeat",
		description: "Deep night tiles with bright constellation sparks.",
		patternWidth: 4,
		patternHeight: 2,
		hasCornerCompanions: true,
		cornerCells: {
			topLeft: [
				{ dx: 0, dy: 0, colorId: "black" },
				{ dx: 1, dy: 0, colorId: "blue" },
				{ dx: 0, dy: 1, colorId: "white" }
			],
			topRight: [
				{ dx: 1, dy: 0, colorId: "black" },
				{ dx: 0, dy: 0, colorId: "blue" },
				{ dx: 1, dy: 1, colorId: "white" }
			],
			bottomLeft: [
				{ dx: 0, dy: 1, colorId: "black" },
				{ dx: 1, dy: 1, colorId: "blue" },
				{ dx: 0, dy: 0, colorId: "white" }
			],
			bottomRight: [
				{ dx: 1, dy: 1, colorId: "black" },
				{ dx: 0, dy: 1, colorId: "blue" },
				{ dx: 1, dy: 0, colorId: "white" }
			]
		},
		cells: [
			{ dx: 0, dy: 0, colorId: "black" },
			{ dx: 1, dy: 0, colorId: "blue" },
			{ dx: 2, dy: 0, colorId: "cyan" },
			{ dx: 3, dy: 0, colorId: "blue" },
			{ dx: 1, dy: 1, colorId: "white" },
			{ dx: 2, dy: 1, colorId: "light_blue" }
		]
	},
	{
		id: "border-ruby-chain",
		name: "Ruby Chain Border",
		category: "border",
		placement: "border-repeat",
		description: "A linked ruby chain with neutral metallic joins.",
		patternWidth: 4,
		patternHeight: 2,
		cells: [
			{ dx: 0, dy: 0, colorId: "gray" },
			{ dx: 1, dy: 0, colorId: "red" },
			{ dx: 2, dy: 0, colorId: "magenta" },
			{ dx: 3, dy: 0, colorId: "red" },
			{ dx: 1, dy: 1, colorId: "light_gray" },
			{ dx: 2, dy: 1, colorId: "white" }
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
