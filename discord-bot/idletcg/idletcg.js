
const storage = require('node-persist');
const config = require('../config.js').BooConfig;
const tcgdata = require('./' + config.cardData);
const tcgplayer = require('./tcgplayer.js');

class IdleTcg {
	
	constructor() {
		this.players = {};
		this.cards = 0;
	}

	load() {
		storage.initSync();
		let players = storage.getItemSync('players');
		if (players !== undefined) {
			this.players = players;
		}

		Object.keys(tcgdata.cards).forEach(key => {
			this.cards += tcgdata.cards[key].length;
		});
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

	getCards() {
		return this.cards;
	}
	
}

exports.IdleTcg = IdleTcg;
