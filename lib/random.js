
function randInt(betweenVal, andVal) {
	return Math.floor(Math.random() * (andVal - betweenVal) + betweenVal);
}

exports.randInt = randInt;
