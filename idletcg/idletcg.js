
class IdleTcg {
	
	constructor() {
		this.players = {};
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
