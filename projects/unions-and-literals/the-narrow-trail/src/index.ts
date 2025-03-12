export function runCommands() {
	let availableResource: "Food" | "Water" | undefined = undefined;
	let day = 1;
	let food = 5;
	let water = 5;

	while (day <= 7) {
		// use resources daily
		food--;
		water--;

		// roll the dice
		const roll = Math.floor(Math.random() * 6) + 1;

		// adventure results
		switch (roll) {
			case 1: {
				availableResource = "Food";
				break;
			}
			case 2: {
				availableResource = "Water";
				break;
			}
			case 3:
			case 5:
				if (!availableResource) {
					availableResource = "Water";
				} else {
					if (availableResource === "Food") {
						food += roll;
					}
					if (availableResource === "Water") {
						water += roll;
					}
					availableResource = undefined;
				}
				break;
			case 4:
			case 6:
				if (!availableResource) {
					availableResource = "Food";
				} else {
					if (availableResource === "Food") {
						food += roll;
					}
					if (availableResource === "Water") {
						water += roll;
					}
					availableResource = undefined;
				}
				break;
		}

		// end day check
		if (food === 0 || water === 0) {
			return false;
		}

		// move to next day
		day++;
	}

	return true;
}
