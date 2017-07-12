
function randInt(betweenVal, andVal) {
	return Math.floor(Math.random() * ((andVal + 1) - betweenVal) + betweenVal);
}

exports.randInt = randInt;
