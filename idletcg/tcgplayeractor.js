
const random = require('../lib/random.js');
const config = require('../config.js').BooConfig;

class TcgPlayerActor {

	constructor(player) {
		this.player = player;
	}

	rewardMoney() {
		let moneyDropRate = config.dropRates.money.rateAsPercentage;
		if (random.randInt(1, 100) <= moneyDropRate) {
			let moneyMin = config.dropRates.money.minimumValue;
			let moneyMax = config.dropRates.money.maximumValue;
			this.player.money += random.randInt(moneyMin, moneyMax)
		}
	}

	rewardIdlePoints() {
		let idlePointsDropRate = config.dropRates.idlePoints.rateAsPercentage;
		if (random.randInt(1,100) <= idlePointsDropRate) {
			let idlePointsMin = config.dropRates.idlePoints.minimumValue;
			let idlePointsMax = config.dropRates.idlePoints.maximumValue;
			this.player.idlePoints += random.randInt(idlePointsMin, idlePointsMax);
		}
	}

	rewardBooster() {
		let idleBoosterCost = config.costs.booster.idlePoints;
		if (this.player.booster === false && this.player.idlePoints >= idleBoosterCost) {
			console.log('booster == false');
			let boosterDropRate = config.dropRates.booster.rateAsPercentage;
			if (random.randInt(1, 100) <= boosterDropRate) {
				console.log('yes');
				this.player.idlePoints -= idleBoosterCost;
				this.player.booster = true;
				return true;
			}
			console.log('no');
		}
		return false;
	}

}

exports.TcgPlayerActor = TcgPlayerActor;
