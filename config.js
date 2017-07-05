
BooConfig = {
	channel: 'bot',
	embedThumbnail: 'https://cdn.discordapp.com/embed/avatars/0.png',
	embedColour: '0xFF0033',
	useAvatarsInDropAlerts: true,
	commandPrefix: '.',
	messagePrefix: '🔊  ',
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
			rateAsPercentage: 40
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
