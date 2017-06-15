
const dotenv = require('dotenv');
const discord = require('discord.js');
const idletcg = require('./idletcg/idletcg.js');

const client = new discord.Client();
const game = new idletcg.IdleTcg();

const commandPrefix = '.';

client.on('ready', () => {
	console.log('I am ready!');
	game.load();
	client.user.setGame("idle tcg: .help");
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

class BooCommands {

	static help(context) {
		context.reply('collect pokemon while you idle, type .join to get started!');
	}

	static join(context) {
		let user = context.author;
		if (game.hasPlayer(user.id)) {
			context.reply('you are already a registered player!');
		}
		else {
			game.addPlayer(user.id, user.username);
			game.save();
			context.reply('you are now playing idle tcg, good luck!');
		}
	}

}

dotenv.config({path: 'boo.env'});
client.login(process.env.BOO_TOKEN);
