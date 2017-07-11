
const random = require('../lib/random.js');
const config = require('../config.js').BooConfig;
const tcgdata = require('./' + config.cardData);

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
		// prevent idle points increasing while boosters not unpacked
		if (this.player.booster !== false) return;

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
			let boosterDropRate = config.dropRates.booster.rateAsPercentage;
			if (random.randInt(1, 100) <= boosterDropRate) {
				this.player.idlePoints = 0;
				this.player.booster = random.randInt(0, tcgdata.boosters.length -1);
				return true;
			}
		}
		return false;
	}

	openBooster() {
		let booster = tcgdata.boosters[this.player.booster];
		let cards = tcgdata.cards[booster];
		let card = cards[random.randInt(0, cards.length -1)];
		this.player.cards[card.id] = 1;
		this.player.booster = false;
		return card;
	}

}

exports.TcgPlayerActor = TcgPlayerActor;
