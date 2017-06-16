
const storage = require('node-persist');

const tcgplayer = require('./tcgplayer.js');

class IdleTcg {
	
	constructor() {
		this.players = {};
	}

	load() {
		storage.initSync();
		let players = storage.getItemSync('players');
		if (players !== undefined) {
			this.players = players;
		}
	}

	save() {
		storage.setItemSync('players', this.players);
	}
	
	addPlayer(id, username) {
		this.players[id] = new tcgplayer.TcgPlayer(username);
	}
	
	getPlayer(id) {
		return this.players[id];
	}

	hasPlayer(id) {
		if (this.players[id] === undefined) {
			return false;
		}
		return true;
	}
	
}

exports.IdleTcg = IdleTcg;
