
const dotenv = require('dotenv');
const discord = require('discord.js');
const idletcg = require('./idletcg/idletcg.js');
const tcgdata = require('./idletcg/tcgdata.js');
const tcgplayeractor = require('./idletcg/tcgplayeractor.js');
const random = require('./lib/random.js');
const config = require('./config.js').BooConfig;

const client = new discord.Client();
const game = new idletcg.IdleTcg();
const commandPrefix = config.commandPrefix;
const scanTime = config.scanTime;

client.on('ready', () => {
	game.load();
	client.user.setGame("idletcg: .help");
	console.log('boo: running');
	setInterval(BooSchedule.updateIdleTcg, scanTime * 1000);
});

client.on('message', message => {
	if (message.channel.name !== config.channel ||
		message.content[0] !== commandPrefix) {
		return;
	}
	let command = message.content.substring(1);

	if (command in BooCommands) {
		BooCommands[command](message);
	}
});

class BooSchedule {

	static updateIdleTcg() {
		client.users.forEach(function(user, id, _) {
			if (!game.hasPlayer(id)) return;
			let player = game.getPlayer(id);
			let playerActor = new tcgplayeractor.TcgPlayerActor(player);
			
			playerActor.rewardMoney();
			playerActor.rewardIdlePoints();

			let boosterEarned = playerActor.rewardBooster();
			if (boosterEarned) {
				let idleStr = user + ' has idled for ';
				let idleTime = player.idle + ' seconds, and found a ';
				let desc = tcgdata.boosters[player.booster] + ' ' + tcgdata.boosterDescript;
				let help = '; ' + config.commandPrefix + 'unpack to open';

				let channel = client.channels.find('name', config.channel);
				channel.send(idleStr + idleTime + desc + help);
			}

			player.idle += scanTime;
			player.username = user.username;

			console.log(' --- ');
			console.log('username: ' + player.username);
			console.log('idleTime: ' + player.idle);
			console.log('money: ' + player.money);
			console.log('idlePoints: ' + player.idlePoints);
			console.log(' --- ')
			console.log(' ');
		});

		game.save();
	}

}

class BooCommands {

	static help(context) {
		context.reply('collect pokemon while you idle, type .join to get started!');
	}

	static cards(context) {
		let cards = game.getCards();
		context.reply('there are currently ' + cards + ' cards in circulation');
	}

	static join(context) {
		let user = context.author;
		if (game.hasPlayer(user.id)) {
			context.reply('you are already a registered player!');
		}
		else {
			game.addPlayer(user.id, user.username);
			game.save();
			context.reply('you are now playing idletcg, good luck!');
		}
	}

	static unpack(context) {
		let user = context.author;
		if (game.hasPlayer(user.id)) {
			let player = game.getPlayer(user.id);
			if (player.booster !== false) {
				let playerActor =  new tcgplayeractor.TcgPlayerActor(player);
				let card = playerActor.openBooster();
				console.log(card);
				context.reply('you received #' + card.id + ' - ' + card.text);
			}
			else {
				context.reply('sorry; you don\'t have anything to unpack!');
			}
		}
		else {
			context.reply('sorry; you\'re not a registered player, see .help!');
		}
	}

	static stats(context) {
		let user = context.author;
		if (game.hasPlayer(user.id)) {
			let player = game.getPlayer(user.id);
			let idle = 'you\'ve idled for ' + player.idle + ' seconds';
			let money = 'and have ¥' + player.money + ' in your piggy bank';
			context.reply(idle + ' ' + money + '!');

			let cards = Object.keys(player.cards).length;
			let collected = 'you have collected ' + cards + '/' + game.cards;
			let boosters = '!';
			if (player.booster !== false) {
				boosters = ', and have one sealed ' + tcgdata.boosterDescript;
			}
			context.reply(collected + ' trading cards' + boosters);
		}
		else {
			context.reply('sorry; you\'re not a registered player, see .help!');
		}
	}

}

dotenv.config({path: 'boo.env'});
client.login(process.env.BOO_TOKEN);
