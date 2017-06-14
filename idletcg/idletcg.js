
const storage = require('node-persist');

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
		this.players[id] = username;
	}
	
	hasPlayer(id) {
		if (this.players[id] === undefined) {
			return false;
		}
		return true;
	}
	
}

exports.IdleTcg = IdleTcg;
