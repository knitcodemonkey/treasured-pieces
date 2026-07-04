// Dedicated oversized motifs for 128x128 map art canvases.
const MAP_ART_SINGLE_MOTIFS = [
	{
		id: "mapart-solar-burst",
		name: "Solar Burst",
		category: "single",
		placement: "center",
		description: "A large radial sunburst built for map-scale murals.",
		buildCells() {
			const cells = [];
			const maxRadius = 30;
			for (let y = -34; y <= 34; y += 1) {
				for (let x = -34; x <= 34; x += 1) {
					const distance = Math.sqrt(x * x + y * y);
					if (distance > maxRadius) {
						continue;
					}

					let colorId = "yellow";
					if (distance <= 5) {
						colorId = "white";
					} else if (distance <= 10) {
						colorId = "orange";
					} else if (distance <= 16) {
						colorId = "yellow";
					} else if ((Math.abs(x) + Math.abs(y)) % 6 < 3) {
						colorId = "orange";
					}

					cells.push({ dx: x, dy: y, colorId });
				}
			}

			for (let i = -40; i <= 40; i += 1) {
				if (Math.abs(i) <= 5) {
					continue;
				}
				cells.push({ dx: i, dy: 0, colorId: "yellow" });
				cells.push({ dx: 0, dy: i, colorId: "yellow" });
				if (i % 2 === 0) {
					cells.push({ dx: i, dy: i, colorId: "orange" });
					cells.push({ dx: -i, dy: i, colorId: "orange" });
				}
			}

			return cells;
		}
	},
	{
		id: "mapart-cathedral-rose",
		name: "Cathedral Rose",
		category: "single",
		placement: "center",
		description: "A broad stained-glass rose with layered rings.",
		buildCells() {
			const cells = [];
			for (let y = -38; y <= 38; y += 1) {
				for (let x = -38; x <= 38; x += 1) {
					const taxicab = Math.abs(x) + Math.abs(y);
					if (taxicab > 54) {
						continue;
					}

					let colorId = "light_gray";
					if (taxicab <= 8) {
						colorId = "white";
					} else if (taxicab <= 16) {
						colorId = "cyan";
					} else if (taxicab <= 24) {
						colorId = "light_blue";
					} else if (taxicab <= 32) {
						colorId = "blue";
					} else if (taxicab <= 40) {
						colorId = "purple";
					} else if (taxicab <= 48) {
						colorId = "magenta";
					}

					if (Math.abs(x) % 8 === 0 || Math.abs(y) % 8 === 0) {
						colorId = "white";
					}
					cells.push({ dx: x, dy: y, colorId });
				}
			}
			return cells;
		}
	},
	{
		id: "mapart-northern-lights",
		name: "Northern Lights",
		category: "single",
		placement: "center",
		description: "Layered aurora curtains spanning much of the map.",
		buildCells() {
			const cells = [];
			for (let x = -52; x <= 52; x += 1) {
				const waveOffset = Math.round(
					Math.sin(x / 7) * 5 + Math.sin(x / 17) * 3
				);
				for (let y = -34; y <= 34; y += 1) {
					const shiftedY = y + waveOffset;
					if (shiftedY < -34 || shiftedY > 34) {
						continue;
					}

					let colorId = "blue";
					if (shiftedY < -14) {
						colorId = "cyan";
					} else if (shiftedY < -4) {
						colorId = "light_blue";
					} else if (shiftedY < 8) {
						colorId = "green";
					} else if (shiftedY < 18) {
						colorId = "lime";
					} else {
						colorId = "purple";
					}

					if (x % 9 === 0) {
						colorId = "white";
					}
					cells.push({ dx: x, dy: shiftedY, colorId });
				}
			}
			return cells;
		}
	},
	{
		id: "mapart-grand-peak",
		name: "Grand Peak",
		category: "single",
		placement: "center",
		description: "A wide mountain silhouette with sky and snow bands.",
		buildCells() {
			const cells = [];
			for (let y = -32; y <= 24; y += 1) {
				for (let x = -54; x <= 54; x += 1) {
					let colorId = null;
					if (y < -12) {
						colorId = (x + y) % 5 === 0 ? "cyan" : "light_blue";
					}

					const ridge = -6 - Math.floor((54 - Math.abs(x)) / 3);
					if (y >= ridge && y <= 24) {
						if (y <= ridge + 2) {
							colorId = "white";
						} else if (y <= ridge + 6) {
							colorId = "light_gray";
						} else if (y <= ridge + 14) {
							colorId = "gray";
						} else {
							colorId = "black";
						}
					}

					if (colorId) {
						cells.push({ dx: x, dy: y, colorId });
					}
				}
			}
			return cells;
		}
	},
	{
		id: "mapart-arcane-gear",
		name: "Arcane Gear",
		category: "single",
		placement: "center",
		description: "A large mechanical sigil with layered tooth rings.",
		buildCells() {
			const cells = [];
			for (let y = -34; y <= 34; y += 1) {
				for (let x = -34; x <= 34; x += 1) {
					const distance = Math.sqrt(x * x + y * y);
					if (distance > 32) {
						continue;
					}

					let colorId = null;
					if (distance <= 6) {
						colorId = "white";
					} else if (distance <= 10) {
						colorId = "yellow";
					} else if (distance <= 16) {
						colorId = "orange";
					} else if (distance <= 24) {
						colorId = "gray";
					} else if (Math.abs(x) % 6 <= 1 || Math.abs(y) % 6 <= 1) {
						colorId = "light_gray";
					}

					if (!colorId) {
						continue;
					}
					cells.push({ dx: x, dy: y, colorId });
				}
			}

			for (let i = -40; i <= 40; i += 1) {
				if (i % 8 === 0) {
					cells.push({ dx: i, dy: -38, colorId: "light_gray" });
					cells.push({ dx: i, dy: 38, colorId: "light_gray" });
					cells.push({ dx: -38, dy: i, colorId: "light_gray" });
					cells.push({ dx: 38, dy: i, colorId: "light_gray" });
				}
			}

			return cells;
		}
	}
];

if (typeof window !== "undefined") {
	window.projectCoreMapArtSingleMotifs = {
		MAP_ART_SINGLE_MOTIFS
	};
}

if (typeof module !== "undefined") {
	module.exports = {
		MAP_ART_SINGLE_MOTIFS
	};
}
