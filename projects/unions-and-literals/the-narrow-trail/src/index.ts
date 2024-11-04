export function runCommands() {
	let availableResource: "food" | "water" | undefined;
	let day = 1;
	let food = 5;
	let water = 5;

	while (day <= 7) {
		const rolled = Math.floor(Math.random() * 6) + 1;

		// Random events logic
		switch (rolled) {
			case 1:
				availableResource = "food";
				break;
			case 2:
				availableResource = "water";
				break;
			case 3:
			case 5:
				if (!availableResource) {
					availableResource = "water";
				} else {
					if (availableResource === "water") {
						water += rolled;
					}
					if (availableResource === "food") {
						food += rolled;
					}
					availableResource = undefined;
				}
				break;
			case 4:
			case 6:
				if (!availableResource) {
					availableResource = "food";
				} else {
					if (availableResource === "water") {
						water += rolled;
					}
					if (availableResource === "food") {
						food += rolled;
					}
					availableResource = undefined;
				}
				break;
		}

		// Daily expenses
		food--;
		water--;

		// Supply check
		if (food === 0 || water === 0) {
			// We lost
			return false;
		}

		// Advance to next day
		day++;
	}

	// We survived 7 days
	return true;
}
