const VOWEL_REGEXP = /[aeiou]/i;
const CONSONANT_REGEXP = /[bcdfghjklmnpqrstvwxyz]/i;

export type Cipher = (char: string) => string;

export function createAdvancedCipher(
	onVowel: Cipher,
	onConsonant: Cipher,
	onPunctuation: Cipher
) {
	return function (text: string) {
		let result = "";

		for (const char of text) {
			if (VOWEL_REGEXP.test(char)) {
				result += onVowel(char);
			} else if (CONSONANT_REGEXP.test(char)) {
				result += onConsonant(char);
			} else {
				result += onPunctuation(char);
			}
		}

		return result;
	};
}
