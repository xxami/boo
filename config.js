
BooConfig = {
	channel: 'bot',
	scanTime: 10,

	dropRates: {

		money: {
			rateAsPercentage: 100,
			minimumValue: 0,
			maximumValue: 137
		},

		idlePoints: {
			rateAsPercentage: 100,
			minimumValue: 0,
			maximumValue: 137
		},

		booster: {
			rateAsPercentage: 20
		}

	},

	costs: {
		booster: {
			idlePoints: 137,
			money: 20000
		}
	}
}

exports.BooConfig = BooConfig;
