export type CodeCrackerConfig = {
	attempts: number;
	makeGuess: (text: string, attempt: number) => string;
	validateGuess: (guess: string) => boolean;
};

export function createCodeCracker({
	attempts,
	makeGuess,
	validateGuess,
}: CodeCrackerConfig) {
	return function (text: string) {
		for (let i = 0; i < attempts; i++) {
			const guess = makeGuess(text, i);
			if (validateGuess(guess)) {
				return guess;
			}
		}

		return undefined;
	};
}
