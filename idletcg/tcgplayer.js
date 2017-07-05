
const tcgdata = require('./tcgdata.js');

class TcgPlayer {

	constructor(username) {
		this.username = username;
		this.idle = 0;
		this.idlePoints = 0;
		this.money = 0;
		this.cards = {};
		this.booster = false;
		this.title = tcgdata.titles[0];
	}

}

exports.TcgPlayer = TcgPlayer;
