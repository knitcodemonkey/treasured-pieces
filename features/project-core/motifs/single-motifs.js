// Generated from motif definitions split by category.
const SINGLE_MOTIFS = [
	{
		id: "sun",
		name: "Sun",
		category: "single",
		placement: "center",
		description: "A bright sun cross with warm orange accents.",
		buildCells() {
			const cells = [];
			for (let i = -4; i <= 4; i += 1) {
				cells.push({ dx: i, dy: 0, colorId: "yellow" });
				cells.push({ dx: 0, dy: i, colorId: "yellow" });
			}
			[
				[-3, -3],
				[3, -3],
				[-3, 3],
				[3, 3],
				[-2, -2],
				[2, -2],
				[-2, 2],
				[2, 2]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "orange" });
			});
			cells.push({ dx: 0, dy: 0, colorId: "white" });
			return cells;
		}
	},
	{
		id: "moon",
		name: "Moon",
		category: "single",
		placement: "center",
		description: "A crescent moon with a small star field accent.",
		buildCells() {
			const cells = [];

			const outerRadius = 5;
			const innerRadius = 4;
			const innerOffsetX = 2;

			for (let y = -outerRadius; y <= outerRadius; y += 1) {
				for (let x = -outerRadius; x <= outerRadius; x += 1) {
					const inOuter = x * x + y * y <= outerRadius * outerRadius;
					const innerX = x - innerOffsetX;
					const inInner = innerX * innerX + y * y <= innerRadius * innerRadius;

					if (inOuter && !inInner) {
						cells.push({ dx: x, dy: y, colorId: "white" });
					}
				}
			}

			[
				{ dx: 4, dy: -4, colorId: "yellow" },
				{ dx: 6, dy: -2, colorId: "light_blue" },
				{ dx: 5, dy: 1, colorId: "yellow" },
				{ dx: 7, dy: 2, colorId: "light_blue" },
				{ dx: 6, dy: 4, colorId: "yellow" }
			].forEach((star) => {
				cells.push(star);
			});

			return cells;
		}
	},
	{
		id: "compass",
		name: "Compass Rose",
		category: "single",
		placement: "center",
		description: "A compass rose with cool cardinal rays and cyan tips.",
		buildCells() {
			const cells = [];
			for (let i = -5; i <= 5; i += 1) {
				cells.push({ dx: i, dy: 0, colorId: "blue" });
				cells.push({ dx: 0, dy: i, colorId: "light_blue" });
			}
			[
				[-4, -4],
				[4, -4],
				[-4, 4],
				[4, 4],
				[-3, -3],
				[3, -3],
				[-3, 3],
				[3, 3]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "cyan" });
			});
			cells.push({ dx: 0, dy: 0, colorId: "white" });
			return cells;
		}
	},
	{
		id: "flower",
		name: "Flower",
		category: "single",
		placement: "center",
		description: "A simple flower medallion with a gold center.",
		cells: [
			{ dx: 0, dy: 0, colorId: "yellow" },
			{ dx: 0, dy: -2, colorId: "purple" },
			{ dx: 0, dy: 2, colorId: "purple" },
			{ dx: -2, dy: 0, colorId: "purple" },
			{ dx: 2, dy: 0, colorId: "purple" },
			{ dx: -1, dy: -1, colorId: "purple" },
			{ dx: 1, dy: -1, colorId: "purple" },
			{ dx: -1, dy: 1, colorId: "purple" },
			{ dx: 1, dy: 1, colorId: "purple" }
		]
	},
	{
		id: "deco",
		name: "Art Deco Diamond",
		category: "single",
		placement: "center",
		description: "A layered diamond motif with cool jewel-tone rings.",
		buildCells() {
			const cells = [];
			const rings = [
				{ radius: 4, colorId: "gray" },
				{ radius: 3, colorId: "purple" },
				{ radius: 2, colorId: "cyan" },
				{ radius: 1, colorId: "white" }
			];

			for (const ring of rings) {
				for (let y = -ring.radius; y <= ring.radius; y += 1) {
					for (let x = -ring.radius; x <= ring.radius; x += 1) {
						if (Math.abs(x) + Math.abs(y) === ring.radius) {
							cells.push({ dx: x, dy: y, colorId: ring.colorId });
						}
					}
				}
			}
			cells.push({ dx: 0, dy: 0, colorId: "magenta" });
			return cells;
		}
	},
	{
		id: "deco-fan",
		name: "Art Deco Fan",
		category: "single",
		placement: "center",
		description: "A stepped fan with rising gold and amber bands.",
		buildCells() {
			const cells = [];
			for (let row = 0; row < 6; row += 1) {
				const width = row * 2 + 1;
				const colorId = row % 2 === 0 ? "yellow" : "orange";
				for (
					let x = -Math.floor(width / 2);
					x <= Math.floor(width / 2);
					x += 1
				) {
					cells.push({ dx: x, dy: 3 - row, colorId });
				}
			}
			for (let y = -2; y <= 3; y += 1) {
				cells.push({ dx: -6, dy: y, colorId: "brown" });
				cells.push({ dx: 6, dy: y, colorId: "brown" });
			}
			cells.push({ dx: 0, dy: 4, colorId: "white" });
			return cells;
		}
	},
	{
		id: "deco-pillars",
		name: "Art Deco Pillars",
		category: "single",
		placement: "center",
		description: "Symmetric stepped columns with a framed center jewel.",
		buildCells() {
			const cells = [];
			for (let y = -4; y <= 4; y += 1) {
				cells.push({ dx: -6, dy: y, colorId: "brown" });
				cells.push({ dx: 6, dy: y, colorId: "brown" });
			}
			for (let y = -3; y <= 3; y += 1) {
				cells.push({ dx: -5, dy: y, colorId: "orange" });
				cells.push({ dx: 5, dy: y, colorId: "orange" });
			}
			for (let y = -2; y <= 2; y += 1) {
				cells.push({ dx: -4, dy: y, colorId: "yellow" });
				cells.push({ dx: 4, dy: y, colorId: "yellow" });
			}
			for (let x = -2; x <= 2; x += 1) {
				cells.push({ dx: x, dy: -2, colorId: "light_gray" });
				cells.push({ dx: x, dy: 2, colorId: "light_gray" });
			}
			for (let y = -1; y <= 1; y += 1) {
				cells.push({ dx: -2, dy: y, colorId: "light_gray" });
				cells.push({ dx: 2, dy: y, colorId: "light_gray" });
			}
			cells.push({ dx: 0, dy: 0, colorId: "white" });
			return cells;
		}
	},
	{
		id: "star-medallion",
		name: "Star Medallion",
		category: "single",
		placement: "center",
		description: "An eight-point star with a bright central jewel.",
		cells: [
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: 0, dy: -1, colorId: "yellow" },
			{ dx: 0, dy: 1, colorId: "yellow" },
			{ dx: -1, dy: 0, colorId: "yellow" },
			{ dx: 1, dy: 0, colorId: "yellow" },
			{ dx: -2, dy: 0, colorId: "orange" },
			{ dx: 2, dy: 0, colorId: "orange" },
			{ dx: 0, dy: -2, colorId: "orange" },
			{ dx: 0, dy: 2, colorId: "orange" },
			{ dx: -1, dy: -1, colorId: "yellow" },
			{ dx: 1, dy: -1, colorId: "yellow" },
			{ dx: -1, dy: 1, colorId: "yellow" },
			{ dx: 1, dy: 1, colorId: "yellow" },
			{ dx: -2, dy: -2, colorId: "light_blue" },
			{ dx: 2, dy: -2, colorId: "light_blue" },
			{ dx: -2, dy: 2, colorId: "light_blue" },
			{ dx: 2, dy: 2, colorId: "light_blue" }
		]
	},
	{
		id: "lotus-bloom",
		name: "Lotus Bloom",
		category: "single",
		placement: "center",
		description: "A layered bloom with soft petals and a warm core.",
		cells: [
			{ dx: 0, dy: 0, colorId: "yellow" },
			{ dx: -1, dy: 0, colorId: "pink" },
			{ dx: 1, dy: 0, colorId: "pink" },
			{ dx: 0, dy: -1, colorId: "pink" },
			{ dx: 0, dy: 1, colorId: "pink" },
			{ dx: -2, dy: 0, colorId: "magenta" },
			{ dx: 2, dy: 0, colorId: "magenta" },
			{ dx: 0, dy: -2, colorId: "magenta" },
			{ dx: 0, dy: 2, colorId: "magenta" },
			{ dx: -1, dy: -1, colorId: "purple" },
			{ dx: 1, dy: -1, colorId: "purple" },
			{ dx: -1, dy: 1, colorId: "purple" },
			{ dx: 1, dy: 1, colorId: "purple" },
			{ dx: -3, dy: 1, colorId: "pink" },
			{ dx: 3, dy: 1, colorId: "pink" },
			{ dx: -2, dy: 2, colorId: "pink" },
			{ dx: 2, dy: 2, colorId: "pink" }
		]
	},
	{
		id: "hearth-knot",
		name: "Hearth Knot",
		category: "single",
		placement: "center",
		description: "A woven knot medallion with ruby accents and dark anchors.",
		cells: [
			{ dx: -2, dy: -2, colorId: "black" },
			{ dx: -1, dy: -2, colorId: "red" },
			{ dx: 1, dy: -2, colorId: "red" },
			{ dx: 2, dy: -2, colorId: "black" },
			{ dx: -2, dy: -1, colorId: "red" },
			{ dx: 2, dy: -1, colorId: "red" },
			{ dx: -2, dy: 1, colorId: "red" },
			{ dx: 2, dy: 1, colorId: "red" },
			{ dx: -2, dy: 2, colorId: "black" },
			{ dx: -1, dy: 2, colorId: "red" },
			{ dx: 1, dy: 2, colorId: "red" },
			{ dx: 2, dy: 2, colorId: "black" },
			{ dx: 0, dy: -1, colorId: "magenta" },
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: 0, dy: 1, colorId: "magenta" },
			{ dx: -1, dy: 0, colorId: "gray" },
			{ dx: 1, dy: 0, colorId: "gray" }
		]
	},
	{
		id: "wind-rose",
		name: "Wind Rose",
		category: "single",
		placement: "center",
		description: "A directional rose motif with cool outer tips.",
		cells: [
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: 0, dy: -1, colorId: "light_blue" },
			{ dx: 0, dy: -2, colorId: "blue" },
			{ dx: 0, dy: -3, colorId: "light_blue" },
			{ dx: 0, dy: 1, colorId: "light_blue" },
			{ dx: 0, dy: 2, colorId: "blue" },
			{ dx: 0, dy: 3, colorId: "light_blue" },
			{ dx: -1, dy: 0, colorId: "light_blue" },
			{ dx: -2, dy: 0, colorId: "blue" },
			{ dx: -3, dy: 0, colorId: "light_blue" },
			{ dx: 1, dy: 0, colorId: "light_blue" },
			{ dx: 2, dy: 0, colorId: "blue" },
			{ dx: 3, dy: 0, colorId: "light_blue" },
			{ dx: -2, dy: -2, colorId: "cyan" },
			{ dx: 2, dy: -2, colorId: "cyan" },
			{ dx: -2, dy: 2, colorId: "cyan" },
			{ dx: 2, dy: 2, colorId: "cyan" }
		]
	},
	{
		id: "aurora-weave",
		name: "Aurora Weave",
		category: "single",
		placement: "center",
		description: "A cool woven lattice of cyan, blue, and violet glass.",
		cells: [
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: -1, dy: 0, colorId: "cyan" },
			{ dx: 1, dy: 0, colorId: "cyan" },
			{ dx: 0, dy: -1, colorId: "light_blue" },
			{ dx: 0, dy: 1, colorId: "light_blue" },
			{ dx: -2, dy: 0, colorId: "blue" },
			{ dx: 2, dy: 0, colorId: "blue" },
			{ dx: 0, dy: -2, colorId: "blue" },
			{ dx: 0, dy: 2, colorId: "blue" },
			{ dx: -1, dy: -1, colorId: "purple" },
			{ dx: 1, dy: -1, colorId: "purple" },
			{ dx: -1, dy: 1, colorId: "purple" },
			{ dx: 1, dy: 1, colorId: "purple" },
			{ dx: -3, dy: -1, colorId: "magenta" },
			{ dx: 3, dy: -1, colorId: "magenta" },
			{ dx: -3, dy: 1, colorId: "magenta" },
			{ dx: 3, dy: 1, colorId: "magenta" }
		]
	},
	{
		id: "emerald-lattice",
		name: "Emerald Lattice",
		category: "single",
		placement: "center",
		description: "A crisp lattice motif with leaf-green and lime highlights.",
		cells: [
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: -1, dy: 0, colorId: "green" },
			{ dx: 1, dy: 0, colorId: "green" },
			{ dx: 0, dy: -1, colorId: "green" },
			{ dx: 0, dy: 1, colorId: "green" },
			{ dx: -2, dy: 0, colorId: "lime" },
			{ dx: 2, dy: 0, colorId: "lime" },
			{ dx: 0, dy: -2, colorId: "lime" },
			{ dx: 0, dy: 2, colorId: "lime" },
			{ dx: -2, dy: -2, colorId: "cyan" },
			{ dx: 2, dy: -2, colorId: "cyan" },
			{ dx: -2, dy: 2, colorId: "cyan" },
			{ dx: 2, dy: 2, colorId: "cyan" }
		]
	},
	{
		id: "grand-rose-window",
		name: "Grand Rose Window",
		category: "single",
		placement: "center",
		description: "A cathedral-scale rose pattern that fills most of the panel.",
		buildCells() {
			const cells = [];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const distance = Math.abs(x) + Math.abs(y);
					if (distance > 14) {
						continue;
					}

					let colorId = "light_gray";
					if (distance <= 2) {
						colorId = "white";
					} else if (distance <= 4) {
						colorId = "light_blue";
					} else if (distance <= 6) {
						colorId = "cyan";
					} else if (distance <= 8) {
						colorId = "blue";
					} else if (distance <= 10) {
						colorId = "purple";
					} else if (distance <= 12) {
						colorId = "magenta";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			for (let i = -8; i <= 8; i += 1) {
				cells.push({
					dx: 0,
					dy: i,
					colorId: Math.abs(i) % 2 === 0 ? "yellow" : "orange"
				});
			}
			for (let i = -9; i <= 9; i += 1) {
				cells.push({
					dx: i,
					dy: 0,
					colorId: Math.abs(i) % 2 === 0 ? "yellow" : "orange"
				});
			}

			return cells;
		}
	},
	{
		id: "cathedral-quatrefoil",
		name: "Cathedral Quatrefoil",
		category: "single",
		placement: "center",
		description:
			"A broad four-lobed tracery motif for tall stained glass fields.",
		buildCells() {
			const cells = [];
			const lobes = [
				{ cx: -4, cy: 0 },
				{ cx: 4, cy: 0 },
				{ cx: 0, cy: -4 },
				{ cx: 0, cy: 4 }
			];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const inLobe = lobes.some((lobe) => {
						const dx = x - lobe.cx;
						const dy = y - lobe.cy;
						return dx * dx + dy * dy <= 25;
					});
					if (!inLobe) {
						continue;
					}

					let colorId = "light_blue";
					if ((x + y) % 4 === 0) {
						colorId = "cyan";
					}
					if ((x - y) % 5 === 0) {
						colorId = "blue";
					}
					if (Math.abs(x) <= 1 && Math.abs(y) <= 1) {
						colorId = "white";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			for (let y = -8; y <= 8; y += 1) {
				cells.push({ dx: -1, dy: y, colorId: "light_gray" });
				cells.push({ dx: 1, dy: y, colorId: "light_gray" });
			}
			for (let x = -8; x <= 8; x += 1) {
				cells.push({ dx: x, dy: -1, colorId: "light_gray" });
				cells.push({ dx: x, dy: 1, colorId: "light_gray" });
			}

			return cells;
		}
	},
	{
		id: "royal-banner-field",
		name: "Royal Banner Field",
		category: "single",
		placement: "center",
		description:
			"A near full-panel heraldic field with layered bands and crest.",
		buildCells() {
			const cells = [];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					let colorId = "purple";
					if ((x + y) % 3 === 0) {
						colorId = "magenta";
					}
					if (Math.abs(y) <= 1) {
						colorId = "blue";
					}
					if (Math.abs(x) <= 1) {
						colorId = "cyan";
					}
					cells.push({ dx: x, dy: y, colorId });
				}
			}

			for (let i = -9; i <= 9; i += 1) {
				cells.push({ dx: i, dy: -8, colorId: "yellow" });
				cells.push({ dx: i, dy: 8, colorId: "yellow" });
			}
			for (let i = -8; i <= 8; i += 1) {
				cells.push({
					dx: -9,
					dy: i,
					colorId: "yellow"
				});
				cells.push({
					dx: 9,
					dy: i,
					colorId: "yellow"
				});
			}

			[
				[0, 0],
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "white" });
			});

			return cells;
		}
	},
	{
		id: "time-wheel-celestial",
		name: "Time Wheel Celestial",
		category: "single",
		placement: "center",
		description: "A cosmic time wheel with luminous rings and cardinal marks.",
		buildCells() {
			const cells = [];
			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const d2 = x * x + y * y;
					if (d2 > 80) {
						continue;
					}

					let colorId = "light_gray";
					if (d2 <= 4) {
						colorId = "white";
					} else if (d2 <= 16) {
						colorId = "yellow";
					} else if (d2 <= 30) {
						colorId = "cyan";
					} else if (d2 <= 48) {
						colorId = "blue";
					} else if (d2 <= 66) {
						colorId = "purple";
					} else {
						colorId = "magenta";
					}

					if (x === 0 || y === 0) {
						colorId = Math.abs(x + y) % 2 === 0 ? "orange" : "yellow";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			[
				[0, -8],
				[0, 8],
				[-9, 0],
				[9, 0]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "white" });
			});

			return cells;
		}
	},
	{
		id: "time-wheel-orrery",
		name: "Time Wheel Orrery",
		category: "single",
		placement: "center",
		description: "A layered orrery wheel with orbital bands and star nodes.",
		buildCells() {
			const cells = [];
			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const d2 = x * x + y * y;
					if (d2 > 82) {
						continue;
					}

					let colorId = "light_blue";
					if (d2 <= 2) {
						colorId = "white";
					} else if (d2 <= 10) {
						colorId = "yellow";
					} else if (d2 <= 22) {
						colorId = "blue";
					} else if (d2 <= 38) {
						colorId = "cyan";
					} else if (d2 <= 58) {
						colorId = "purple";
					} else {
						colorId = "magenta";
					}

					if ((x + y) % 5 === 0 || (x - y) % 5 === 0) {
						colorId = "light_gray";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			[
				[-7, -3],
				[-6, 4],
				[-2, -7],
				[2, 7],
				[6, -4],
				[7, 3]
			].forEach(([dx, dy], index) => {
				cells.push({
					dx,
					dy,
					colorId: index % 2 === 0 ? "orange" : "white"
				});
			});

			return cells;
		}
	},
	{
		id: "time-wheel-eclipse",
		name: "Time Wheel Eclipse",
		category: "single",
		placement: "center",
		description: "A dramatic eclipse wheel with dark ring and radiant halo.",
		buildCells() {
			const cells = [];
			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const d2 = x * x + y * y;
					if (d2 > 82) {
						continue;
					}

					let colorId = "black";
					if (d2 <= 3) {
						colorId = "white";
					} else if (d2 <= 11) {
						colorId = "yellow";
					} else if (d2 <= 24) {
						colorId = "orange";
					} else if (d2 <= 40) {
						colorId = "black";
					} else if (d2 <= 58) {
						colorId = "purple";
					} else {
						colorId = "blue";
					}

					if ((x === 0 || y === 0) && d2 >= 20) {
						colorId = "light_gray";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			return cells;
		}
	},
	{
		id: "time-wheel-zodiac",
		name: "Time Wheel Zodiac",
		category: "single",
		placement: "center",
		description: "A segmented zodiac wheel with twelve highlighted stations.",
		buildCells() {
			const cells = [];
			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const d2 = x * x + y * y;
					if (d2 > 82) {
						continue;
					}

					let colorId = "light_gray";
					if (d2 <= 4) {
						colorId = "white";
					} else if (d2 <= 18) {
						colorId = "cyan";
					} else if (d2 <= 36) {
						colorId = "blue";
					} else if (d2 <= 56) {
						colorId = "purple";
					} else {
						colorId = "magenta";
					}

					if ((Math.abs(x) + Math.abs(y)) % 4 === 0 && d2 >= 24) {
						colorId = "light_blue";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			[
				[0, -8],
				[4, -7],
				[7, -4],
				[8, 0],
				[7, 4],
				[4, 7],
				[0, 8],
				[-4, 7],
				[-7, 4],
				[-8, 0],
				[-7, -4],
				[-4, -7]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "yellow" });
			});

			return cells;
		}
	},
	{
		id: "tarot-sun-arcana",
		name: "Tarot Sun Arcana",
		category: "single",
		placement: "center",
		description:
			"A card-style sun emblem with radiant spokes and framed border.",
		buildCells() {
			const cells = [];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					let colorId = "light_gray";
					if (Math.abs(x) === 9 || Math.abs(y) === 8) {
						colorId = "yellow";
					} else if (Math.abs(x) === 8 || Math.abs(y) === 7) {
						colorId = "orange";
					} else {
						colorId = "light_blue";
					}

					const d2 = x * x + y * y;
					if (d2 <= 4) {
						colorId = "white";
					} else if (d2 <= 13) {
						colorId = "yellow";
					} else if (d2 <= 24) {
						colorId = "orange";
					}

					if ((x === 0 || y === 0) && d2 <= 34) {
						colorId = "yellow";
					}
					if ((x + y) % 6 === 0 && d2 <= 38) {
						colorId = "orange";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			return cells;
		}
	},
	{
		id: "tarot-moon-arcana",
		name: "Tarot Moon Arcana",
		category: "single",
		placement: "center",
		description: "A moon card motif with crescent core and nocturne frame.",
		buildCells() {
			const cells = [];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					let colorId = "black";
					if (Math.abs(x) === 9 || Math.abs(y) === 8) {
						colorId = "blue";
					} else if (Math.abs(x) === 8 || Math.abs(y) === 7) {
						colorId = "purple";
					} else if (Math.abs(x) <= 7 && Math.abs(y) <= 6) {
						colorId = "blue";
					}

					const outer = x * x + y * y <= 45;
					const inner = (x + 2) * (x + 2) + y * y <= 34;
					if (outer && !inner) {
						colorId = "white";
					}

					if ((x === 0 || y === 0) && Math.abs(x) + Math.abs(y) <= 12) {
						colorId = "light_blue";
					}

					if ((x + y) % 5 === 0 && x * x + y * y >= 30) {
						colorId = "magenta";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			return cells;
		}
	},
	{
		id: "tarot-star-arcana",
		name: "Tarot Star Arcana",
		category: "single",
		placement: "center",
		description: "A star card motif with layered eight-point geometry.",
		buildCells() {
			const cells = [];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					let colorId = "light_blue";
					if (Math.abs(x) === 9 || Math.abs(y) === 8) {
						colorId = "light_gray";
					} else if (Math.abs(x) === 8 || Math.abs(y) === 7) {
						colorId = "cyan";
					}

					const manhattan = Math.abs(x) + Math.abs(y);
					if (manhattan <= 2) {
						colorId = "white";
					} else if (manhattan <= 5) {
						colorId = "yellow";
					} else if (manhattan <= 8) {
						colorId = "blue";
					}

					if (
						(x === 0 || y === 0 || Math.abs(x) === Math.abs(y)) &&
						manhattan <= 11
					) {
						colorId = manhattan % 2 === 0 ? "yellow" : "white";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			return cells;
		}
	},
	{
		id: "tarot-wheel-arcana",
		name: "Tarot Wheel Gear Arcana",
		category: "single",
		placement: "center",
		description: "A wheel-of-fortune tarot gear with clock marks and spokes.",
		buildCells() {
			const cells = [];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const d2 = x * x + y * y;
					let colorId = "blue";
					if (Math.abs(x) === 9 || Math.abs(y) === 8) {
						colorId = "light_gray";
					} else if (Math.abs(x) === 8 || Math.abs(y) === 7) {
						colorId = "purple";
					}

					if (d2 <= 5) {
						colorId = "white";
					} else if (d2 <= 14) {
						colorId = "yellow";
					} else if (d2 <= 26) {
						colorId = "orange";
					} else if (d2 <= 40) {
						colorId = "yellow";
					}

					const onGearRing = d2 >= 46 && d2 <= 74;
					const tooth =
						(x % 3 === 0 && Math.abs(y) >= 6) ||
						(y % 3 === 0 && Math.abs(x) >= 7);
					if (onGearRing) {
						colorId = "gray";
						if (tooth) {
							colorId = "light_gray";
						}
					}

					if ((x === 0 || y === 0 || Math.abs(x) === Math.abs(y)) && d2 <= 44) {
						colorId = d2 <= 14 ? "white" : "light_gray";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			[
				[0, -8],
				[4, -7],
				[7, -4],
				[8, 0],
				[7, 4],
				[4, 7],
				[0, 8],
				[-4, 7],
				[-7, 4],
				[-8, 0],
				[-7, -4],
				[-4, -7]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "cyan" });
			});

			cells.push({ dx: 0, dy: -5, colorId: "black" });
			cells.push({ dx: 0, dy: -4, colorId: "black" });
			cells.push({ dx: 1, dy: -3, colorId: "black" });
			cells.push({ dx: 2, dy: -2, colorId: "black" });
			cells.push({ dx: 3, dy: -1, colorId: "black" });
			cells.push({ dx: 0, dy: 0, colorId: "black" });
			cells.push({ dx: 1, dy: 0, colorId: "black" });
			cells.push({ dx: 2, dy: 0, colorId: "black" });
			cells.push({ dx: 3, dy: 0, colorId: "black" });
			cells.push({ dx: 4, dy: 0, colorId: "black" });

			return cells;
		}
	},
	{
		id: "kintsugi-gold-seams",
		name: "Kintsugi Gold Seams",
		category: "single",
		placement: "center",
		description:
			"A tarot card pane of broken glass repaired by radiant gilded seams.",
		buildCells() {
			const cells = [];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const d2 = x * x + y * y;
					if (d2 > 82) {
						continue;
					}

					let colorId = "blue";
					if (Math.abs(x) >= 8 || Math.abs(y) >= 7) {
						colorId = "light_gray";
					} else if (Math.abs(x) >= 7 || Math.abs(y) >= 6) {
						colorId = "purple";
					} else if ((x + y) % 2 === 0) {
						colorId = "black";
					}

					if (d2 <= 10) {
						colorId = "white";
					} else if (d2 <= 26) {
						colorId = (x + y) % 2 === 0 ? "light_blue" : "cyan";
					}

					const seamA = Math.abs(y - Math.trunc((x + 1) / 2)) <= 1;
					const seamB = Math.abs(y + Math.trunc((x - 2) / 2)) <= 1;
					const seamC = Math.abs(x + 1) <= 1 && Math.abs(y) <= 7;
					const seamD = Math.abs(y + 4) <= 1 && Math.abs(x) <= 6;
					if (seamA || seamB || seamC) {
						colorId = d2 <= 8 ? "white" : "yellow";
						if ((x + y) % 3 === 0) {
							colorId = "orange";
						}
					}

					if (seamD && d2 <= 56) {
						colorId = "yellow";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			[
				[0, -8],
				[4, -7],
				[-4, -7],
				[8, 0],
				[-8, 0],
				[0, 8]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "white" });
			});

			return cells;
		}
	},
	{
		id: "lotus-habitat-bloom",
		name: "Lotus Habitat Bloom",
		category: "single",
		placement: "center",
		description:
			"A High-Priestess-style lotus card rising from moonlit water into starlight.",
		buildCells() {
			const cells = [];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const d2 = x * x + y * y;
					if (d2 > 82) {
						continue;
					}

					let colorId = "blue";
					if (y >= 2) {
						colorId = "cyan";
					}
					if (y >= 5) {
						colorId = "green";
					}

					if (Math.abs(x) >= 8 || Math.abs(y) >= 7) {
						colorId = "light_gray";
					} else if (Math.abs(x) >= 7 || Math.abs(y) >= 6) {
						colorId = "purple";
					}

					const petalBand = Math.abs(y + 1) <= 2 && Math.abs(x) <= 6 && y <= 1;
					const crownBand = Math.abs(y + 3) <= 1 && Math.abs(x) <= 4 && y <= -2;
					if (petalBand && d2 <= 42) {
						colorId = Math.abs(x) % 2 === 0 ? "white" : "pink";
					}
					if (crownBand && d2 <= 30) {
						colorId = "white";
					}

					if (Math.abs(y - 3) <= 1 && Math.abs(x) <= 7 && d2 <= 70) {
						colorId = (x + y) % 2 === 0 ? "green" : "lime";
					}

					if ((x === 0 || Math.abs(x) === 3) && y <= 5 && y >= -7 && d2 >= 18) {
						colorId = "light_gray";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			cells.push({ dx: 0, dy: -4, colorId: "yellow" });
			cells.push({ dx: -1, dy: -3, colorId: "yellow" });
			cells.push({ dx: 1, dy: -3, colorId: "yellow" });

			return cells;
		}
	},
	{
		id: "inner-gears-clockwork",
		name: "Inner Gears Clockwork",
		category: "single",
		placement: "center",
		description:
			"A Wheel-of-Fortune tarot clock with interlocked life gears and ascent arc.",
		buildCells() {
			const cells = [];

			for (let y = -8; y <= 8; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					const d2 = x * x + y * y;
					if (d2 > 82) {
						continue;
					}

					let colorId = "black";
					if (Math.abs(x) >= 8 || Math.abs(y) >= 7) {
						colorId = "light_gray";
					} else if (Math.abs(x) >= 7 || Math.abs(y) >= 6) {
						colorId = "purple";
					}

					if (d2 <= 12) {
						colorId = "white";
					} else if (d2 <= 24) {
						colorId = "yellow";
					} else if (d2 <= 38) {
						colorId = "orange";
					} else if (d2 <= 52 && y <= 1) {
						colorId = "gray";
					} else if (d2 <= 52) {
						colorId = "gray";
					}

					if (y >= 3 && d2 <= 78) {
						colorId = y >= 6 ? "black" : "blue";
					}

					const gearA = (x + 5) * (x + 5) + (y + 1) * (y + 1) <= 18;
					const gearB = (x - 5) * (x - 5) + (y + 1) * (y + 1) <= 18;
					const gearC = x * x + (y - 4) * (y - 4) <= 22;
					if (gearA || gearB || gearC) {
						colorId = "blue";
						if ((x + y) % 2 === 0) {
							colorId = "light_blue";
						}
						if (y >= 3) {
							colorId = "gray";
						}
					}

					if ((x === 0 || y === 0 || Math.abs(x) === Math.abs(y)) && d2 <= 44) {
						colorId = d2 <= 12 ? "white" : "light_gray";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			[
				[-5, -1],
				[5, -1],
				[0, 4],
				[0, -8],
				[4, -7],
				[7, -4],
				[8, 0],
				[7, 4],
				[4, 7],
				[0, 8],
				[-4, 7],
				[-7, 4],
				[-8, 0],
				[-7, -4],
				[-4, -7]
			].forEach(([dx, dy]) => {
				cells.push({ dx, dy, colorId: "cyan" });
			});

			cells.push({ dx: 0, dy: -5, colorId: "black" });
			cells.push({ dx: 1, dy: -4, colorId: "black" });
			cells.push({ dx: 2, dy: -3, colorId: "black" });
			cells.push({ dx: -1, dy: -1, colorId: "black" });
			cells.push({ dx: 0, dy: 0, colorId: "black" });
			cells.push({ dx: 1, dy: 0, colorId: "black" });
			cells.push({ dx: 2, dy: 1, colorId: "black" });

			return cells;
		}
	},
	{
		id: "full-window-kintsugi-sanctuary",
		name: "XVI • The Tower Reforged",
		category: "single",
		placement: "center",
		description:
			"A 19x26 major-arcana tower card: rupture, repair, and gilded resilience.",
		buildCells() {
			const cells = [];

			for (let y = -13; y <= 12; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					let colorId = "blue";
					if (Math.abs(x) === 9 || y === -13 || y === 12) {
						colorId = "light_gray";
					} else if (Math.abs(x) === 8 || y === -12 || y === 11) {
						colorId = "gray";
					}

					if (Math.abs(x) <= 3 && y >= -10 && y <= 8) {
						colorId = "light_blue";
					}

					if (y >= 9 && Math.abs(x) <= 7) {
						colorId = "black";
					}

					if (Math.abs(y + x + 1) <= 1 && y >= -11 && y <= 9) {
						colorId = "yellow";
					}

					if (Math.abs(y - x + 6) <= 0 && y >= -5 && y <= 4) {
						colorId = "yellow";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			cells.push({ dx: 0, dy: -11, colorId: "white" });
			cells.push({ dx: -1, dy: -10, colorId: "white" });
			cells.push({ dx: 1, dy: -10, colorId: "white" });
			cells.push({ dx: 0, dy: 10, colorId: "yellow" });

			return cells;
		}
	},
	{
		id: "full-window-lotus-ascension",
		name: "XVII • The Star Lotus",
		category: "single",
		placement: "center",
		description:
			"A 19x26 major-arcana star card where lotus bloom rises from the depths.",
		buildCells() {
			const cells = [];

			for (let y = -13; y <= 12; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					let colorId = "light_blue";
					if (Math.abs(x) >= 8 || y <= -12 || y >= 11) {
						colorId = "light_gray";
					}

					if (y >= 5 && Math.abs(x) <= 7) {
						colorId = "blue";
					}

					if (y >= 9 && Math.abs(x) <= 7) {
						colorId = "black";
					}

					if (Math.abs(x) <= 1 && y >= -10 && y <= 7) {
						colorId = "white";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			for (let y = -2; y <= 3; y += 1) {
				for (let x = -6; x <= 6; x += 1) {
					if (Math.abs(x) + Math.abs(y - 1) <= 6) {
						cells.push({
							dx: x,
							dy: y,
							colorId: Math.abs(x) % 2 === 0 ? "pink" : "light_gray"
						});
					}
				}
			}

			cells.push({ dx: 0, dy: -11, colorId: "white" });
			cells.push({ dx: -1, dy: -10, colorId: "yellow" });
			cells.push({ dx: 1, dy: -10, colorId: "yellow" });

			return cells;
		}
	},
	{
		id: "full-window-wheel-of-fortune",
		name: "X • Wheel Of Fortune",
		category: "single",
		placement: "center",
		description:
			"A 19x26 major-arcana wheel card tracing descent, nadir, and return.",
		buildCells() {
			const cells = [];

			for (let y = -13; y <= 12; y += 1) {
				for (let x = -9; x <= 9; x += 1) {
					let colorId = "black";
					if (Math.abs(x) === 9 || y === -13 || y === 12) {
						colorId = "gray";
					} else if (Math.abs(x) === 8 || y === -12 || y === 11) {
						colorId = "purple";
					}

					if (Math.abs(x) <= 6 && y >= -10 && y <= 6) {
						colorId = "blue";
					}

					if (y >= 8 && Math.abs(x) <= 7) {
						colorId = "black";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			for (let y = -9; y <= 3; y += 1) {
				for (let x = -7; x <= 7; x += 1) {
					const d2 = x * x + (y + 3) * (y + 3);
					if (d2 <= 40 && d2 >= 24) {
						cells.push({ dx: x, dy: y, colorId: "yellow" });
					}
					if (d2 <= 23) {
						cells.push({ dx: x, dy: y, colorId: "white" });
					}
				}
			}

			for (let i = -5; i <= 5; i += 1) {
				cells.push({ dx: i, dy: -3, colorId: "light_gray" });
				cells.push({ dx: 0, dy: i - 3, colorId: "light_gray" });
			}

			cells.push({ dx: 0, dy: -7, colorId: "black" });
			cells.push({ dx: 1, dy: -6, colorId: "black" });
			cells.push({ dx: 2, dy: -5, colorId: "black" });
			cells.push({ dx: 3, dy: -4, colorId: "black" });
			cells.push({ dx: 4, dy: -3, colorId: "black" });

			cells.push({ dx: 0, dy: -11, colorId: "yellow" });
			cells.push({ dx: 0, dy: 11, colorId: "yellow" });

			return cells;
		}
	},
	{
		id: "clock-lancet-spire",
		name: "Lancet Spire",
		category: "single",
		placement: "center",
		description: "A tall lancet panel with cobalt spine and gilded crown.",
		cells: [
			{ dx: 0, dy: -7, colorId: "yellow" },
			{ dx: -1, dy: -6, colorId: "light_blue" },
			{ dx: 0, dy: -6, colorId: "white" },
			{ dx: 1, dy: -6, colorId: "light_blue" },
			{ dx: -1, dy: -5, colorId: "cyan" },
			{ dx: 0, dy: -5, colorId: "blue" },
			{ dx: 1, dy: -5, colorId: "cyan" },
			{ dx: -1, dy: -4, colorId: "light_blue" },
			{ dx: 0, dy: -4, colorId: "blue" },
			{ dx: 1, dy: -4, colorId: "light_blue" },
			{ dx: -1, dy: -3, colorId: "cyan" },
			{ dx: 0, dy: -3, colorId: "blue" },
			{ dx: 1, dy: -3, colorId: "cyan" },
			{ dx: -1, dy: -2, colorId: "light_blue" },
			{ dx: 0, dy: -2, colorId: "blue" },
			{ dx: 1, dy: -2, colorId: "light_blue" },
			{ dx: -2, dy: -1, colorId: "light_gray" },
			{ dx: -1, dy: -1, colorId: "cyan" },
			{ dx: 0, dy: -1, colorId: "white" },
			{ dx: 1, dy: -1, colorId: "cyan" },
			{ dx: 2, dy: -1, colorId: "light_gray" },
			{ dx: -2, dy: 0, colorId: "gray" },
			{ dx: -1, dy: 0, colorId: "light_blue" },
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: 1, dy: 0, colorId: "light_blue" },
			{ dx: 2, dy: 0, colorId: "gray" },
			{ dx: -2, dy: 1, colorId: "light_gray" },
			{ dx: -1, dy: 1, colorId: "cyan" },
			{ dx: 0, dy: 1, colorId: "white" },
			{ dx: 1, dy: 1, colorId: "cyan" },
			{ dx: 2, dy: 1, colorId: "light_gray" },
			{ dx: -1, dy: 2, colorId: "light_blue" },
			{ dx: 0, dy: 2, colorId: "blue" },
			{ dx: 1, dy: 2, colorId: "light_blue" },
			{ dx: -1, dy: 3, colorId: "cyan" },
			{ dx: 0, dy: 3, colorId: "blue" },
			{ dx: 1, dy: 3, colorId: "cyan" },
			{ dx: -1, dy: 4, colorId: "light_blue" },
			{ dx: 0, dy: 4, colorId: "blue" },
			{ dx: 1, dy: 4, colorId: "light_blue" },
			{ dx: -1, dy: 5, colorId: "cyan" },
			{ dx: 0, dy: 5, colorId: "blue" },
			{ dx: 1, dy: 5, colorId: "cyan" },
			{ dx: -1, dy: 6, colorId: "light_blue" },
			{ dx: 0, dy: 6, colorId: "white" },
			{ dx: 1, dy: 6, colorId: "light_blue" },
			{ dx: 0, dy: 7, colorId: "yellow" }
		]
	},
	{
		id: "clock-hourglass",
		name: "Astral Clockwork",
		category: "single",
		placement: "center",
		description:
			"A vaulted clockwork dial with jewel spokes and a hanging pendulum.",
		cells: [
			{ dx: -2, dy: -6, colorId: "yellow" },
			{ dx: 0, dy: -6, colorId: "white" },
			{ dx: 2, dy: -6, colorId: "yellow" },
			{ dx: -3, dy: -5, colorId: "light_gray" },
			{ dx: -1, dy: -5, colorId: "yellow" },
			{ dx: 0, dy: -5, colorId: "white" },
			{ dx: 1, dy: -5, colorId: "yellow" },
			{ dx: 3, dy: -5, colorId: "light_gray" },
			{ dx: -2, dy: -4, colorId: "purple" },
			{ dx: 0, dy: -4, colorId: "magenta" },
			{ dx: 2, dy: -4, colorId: "purple" },
			{ dx: -3, dy: -3, colorId: "blue" },
			{ dx: -1, dy: -3, colorId: "magenta" },
			{ dx: 0, dy: -3, colorId: "white" },
			{ dx: 1, dy: -3, colorId: "magenta" },
			{ dx: 3, dy: -3, colorId: "blue" },
			{ dx: -3, dy: -2, colorId: "cyan" },
			{ dx: -2, dy: -2, colorId: "light_blue" },
			{ dx: -1, dy: -2, colorId: "blue" },
			{ dx: 0, dy: -2, colorId: "light_gray" },
			{ dx: 1, dy: -2, colorId: "blue" },
			{ dx: 2, dy: -2, colorId: "light_blue" },
			{ dx: 3, dy: -2, colorId: "cyan" },
			{ dx: -2, dy: -1, colorId: "blue" },
			{ dx: -1, dy: -1, colorId: "cyan" },
			{ dx: 0, dy: -1, colorId: "white" },
			{ dx: 1, dy: -1, colorId: "cyan" },
			{ dx: 2, dy: -1, colorId: "blue" },
			{ dx: -3, dy: 0, colorId: "cyan" },
			{ dx: -2, dy: 0, colorId: "light_blue" },
			{ dx: -1, dy: 0, colorId: "blue" },
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: 1, dy: 0, colorId: "blue" },
			{ dx: 2, dy: 0, colorId: "light_blue" },
			{ dx: 3, dy: 0, colorId: "cyan" },
			{ dx: -2, dy: 1, colorId: "blue" },
			{ dx: -1, dy: 1, colorId: "cyan" },
			{ dx: 0, dy: 1, colorId: "white" },
			{ dx: 1, dy: 1, colorId: "cyan" },
			{ dx: 2, dy: 1, colorId: "blue" },
			{ dx: -1, dy: 2, colorId: "light_gray" },
			{ dx: 0, dy: 2, colorId: "gray" },
			{ dx: 1, dy: 2, colorId: "light_gray" },
			{ dx: 0, dy: 3, colorId: "gray" },
			{ dx: 0, dy: 4, colorId: "light_gray" },
			{ dx: -1, dy: 5, colorId: "yellow" },
			{ dx: 0, dy: 5, colorId: "white" },
			{ dx: 1, dy: 5, colorId: "yellow" },
			{ dx: 0, dy: 6, colorId: "yellow" }
		]
	},
	{
		id: "clock-rose-tracery",
		name: "Rose Tracery",
		category: "single",
		placement: "center",
		description: "A compact rose tracery medallion for narrow lancet windows.",
		cells: [
			{ dx: 0, dy: 0, colorId: "white" },
			{ dx: -1, dy: 0, colorId: "light_gray" },
			{ dx: 1, dy: 0, colorId: "light_gray" },
			{ dx: 0, dy: -1, colorId: "light_gray" },
			{ dx: 0, dy: 1, colorId: "light_gray" },
			{ dx: -2, dy: 0, colorId: "purple" },
			{ dx: 2, dy: 0, colorId: "purple" },
			{ dx: 0, dy: -2, colorId: "purple" },
			{ dx: 0, dy: 2, colorId: "purple" },
			{ dx: -1, dy: -1, colorId: "magenta" },
			{ dx: 1, dy: -1, colorId: "magenta" },
			{ dx: -1, dy: 1, colorId: "magenta" },
			{ dx: 1, dy: 1, colorId: "magenta" },
			{ dx: -3, dy: 0, colorId: "blue" },
			{ dx: 3, dy: 0, colorId: "blue" },
			{ dx: 0, dy: -3, colorId: "blue" },
			{ dx: 0, dy: 3, colorId: "blue" }
		]
	}
];

if (typeof window !== "undefined") {
	window.projectCoreSingleMotifs = {
		SINGLE_MOTIFS
	};
}

if (typeof module !== "undefined") {
	module.exports = {
		SINGLE_MOTIFS
	};
}
