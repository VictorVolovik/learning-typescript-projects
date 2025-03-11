async function checkEmotion(knownEmotions, emotion) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(knownEmotions.has(emotion)), 1000);
	});
}

async function speak(knownEmotions, newEmotion, phrase) {
	if (!(await checkEmotion(knownEmotions, newEmotion))) {
		throw new Error(`Does not compute. I do not understand ${newEmotion}.`);
	}

	return `"${phrase}" (${newEmotion})`;
}

module.exports.checkEmotion = checkEmotion;
module.exports.speak = speak;
