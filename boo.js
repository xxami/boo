
const dotenv = require('dotenv');
const discord = require('discord.js');
const idletcg = require('./idletcg/idletcg.js');

const client = new discord.Client();
const game = new idletcg.IdleTcg();
const commandPrefix = '.';
const scanTime = 10;

client.on('ready', () => {
	game.load();
	client.user.setGame("idletcg: .help");
	console.log('boo: running');
	setInterval(BooSchedule.updateIdleTcg, scanTime * 1000);
});

client.on('message', message => {
	if (message.channel.name !== process.env.BOO_CHANNEL ||
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

			player.idle += scanTime;
			player.money += 137;
			player.username = user.username;
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

	static stats(context) {
		let user = context.author;
		if (game.hasPlayer(user.id)) {
			let player = game.getPlayer(user.id);
			let idle = 'you\'ve idled for ' + player.idle + ' seconds';
			let money = 'and have ¥' + player.money + ' in your piggy bank';
			context.reply(idle + ' ' + money + '!');
		}
		else {
			context.reply('sorry; you\'re not a registered player, see .help!');
		}
	}

}

dotenv.config({path: 'boo.env'});
client.login(process.env.BOO_TOKEN);
