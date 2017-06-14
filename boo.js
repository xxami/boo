
const dotenv = require('dotenv');
const discord = require('discord.js');

const idletcg = require('./idletcg/idletcg.js');

const client = new discord.Client();
const game = new idletcg.IdleTcg();

client.on('ready', () => {
	console.log('I am ready!');
	game.load();
	client.user.setGame("PokemonIdle: .help");
});

client.on('message', message => {
	
	if (message.channel.name != process.env.BOO_CHANNEL) {
		return;
	}

	if (message.content === '.help') {
		message.reply('collect pokemon while you idle, type .join to get started!');
	}
	
	else if (message.content === '.join') {
		let user = message.author;
		if (game.hasPlayer(user.id)) {
			message.reply('you are already a registered player!');
		}
		else {
			game.addPlayer(user.id, user.username);
			game.save();
			message.reply('you are now playing PokemonIdle, good luck!');
		}
	}
	
});

dotenv.config({path: 'boo.env'});
client.login(process.env.BOO_TOKEN);
