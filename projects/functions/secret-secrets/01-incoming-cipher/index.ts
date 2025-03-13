export type Cipher = (char: string) => string;

export function createCipher(cipher: Cipher) {
	return function (text: string) {
		let result = "";

		for (const char of text) {
			result += cipher(char);
		}

		return result;
	};
}
