export type LocationBase = {
	name: string;
	proximity: number;
	treasure?: string;
};

export type Clearing = LocationBase & {
	type: "clearing";
	through?: Location;
};

export type Path = LocationBase & {
	type: "path";
	through: Location;
	shortcut?: Location;
};

export type TownBase = LocationBase & {
	type: "town";
	through?: Location;
	around?: Location;
};

export type TownGoThrough = TownBase & {
	through: Location;
};

export type TownGoAround = TownBase & {
	around: Location;
};

export type TownGoThroughOrAround = TownBase & {
	through: Location;
	around: Location;
};

export type Town =
	| TownBase
	| TownGoThrough
	| TownGoAround
	| TownGoThroughOrAround;

export type StreamBase = LocationBase & {
	type: "stream";
};

export type StreamBeginArea = StreamBase & {
	area: "begin";
	downstream: Location;
};

export type StreamEndArea = StreamBase & {
	area: "end";
	upstream: Location;
};

export type StreamMiddleArea = StreamBase & {
	area: "middle";
	downstream: Location;
	upstream: Location;
};

export type Stream = StreamBeginArea | StreamEndArea | StreamMiddleArea;

export type Location = Clearing | Path | Town | Stream;

export type PossibleLocation = Location | undefined;

let current: PossibleLocation = {
	name: "Woesong Bridge",
	proximity: 100,
	through: {
		area: "middle",
		downstream: {
			around: {
				area: "end",
				upstream: {
					name: "Vizima",
					proximity: 30,
					type: "clearing",
				},
				name: "White Orchard Creek",
				proximity: 25,
				type: "stream",
			},
			name: "Oxenfurt Gate",
			proximity: 40,
			through: {
				name: "Vergen Tunnel",
				proximity: 20,
				shortcut: {
					proximity: 30,
					name: "Crow's Perch",
					type: "town",
				},
				through: {
					area: "begin",
					downstream: {
						through: {
							treasure: "rare playing cards",
							name: "Reuven's Treasure",
							proximity: 0,
							type: "clearing",
						},
						name: "Gate of the Hierarch",
						proximity: 10,
						type: "town",
					},
					name: "Founders Stream",
					proximity: 25,
					type: "stream",
				},
				type: "path",
			},
			type: "town",
		},
		name: "Yavina River",
		proximity: 50,
		type: "stream",
		upstream: {
			name: "Merchants' Trail",
			proximity: 65,
			through: {
				name: "Beauclair",
				proximity: 70,
				type: "town",
			},
			type: "path",
		},
	},
	type: "path",
};

let treasure;

while (current) {
	console.log(`At: ${current.name}`);

	switch (current.type) {
		case "clearing":
			current = current.through;
			break;

		case "path":
			current =
				current.shortcut &&
				current.shortcut.proximity < current.through.proximity
					? current.shortcut
					: current.through;
			break;

		case "town":
			if (!current.around) {
				current = current.through;
			} else if (!current.through) {
				current = current.around;
			} else {
				current =
					current.around.proximity < current.through.proximity
						? current.around
						: current.through;
			}
			break;

		case "stream":
			switch (current.area) {
				case "begin":
					current = current.downstream;
					break;
				case "end":
					current = current.upstream;
					break;
				case "middle":
					current =
						current.downstream.proximity < current.upstream.proximity
							? current.downstream
							: current.upstream;
					break;
			}
	}

	if (!current) {
		console.log("Hmm. Dead end.");
	} else if (current.treasure) {
		treasure = current.treasure;
		break;
	}
}

if (treasure) {
	console.log(`This will do nicely: ${treasure}.`);
} else {
	console.log("Nothing going.");
}
