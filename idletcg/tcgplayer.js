
class TcgPlayer {

	constructor(username) {
		this.username = username;
		this.idle = 0;
		this.money = 0;
		this.cards = {};
	}

}

exports.TcgPlayer = TcgPlayer;
