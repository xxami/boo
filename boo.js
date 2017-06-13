
const dotenv = require('dotenv');
const discord = require('discord.js');
const client = new discord.Client();

class Idler {
	
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

const idler = new Idler();

client.on('ready', () => {
	console.log('I am ready!');
	client.user.setGame("PokemonIdle: .help");
});

client.on('message', message => {
	
	if (message.content === '.help') {
		message.reply('collect pokemon while you idle, type .register to get started!');
	}
	
	else if (message.content === '.register') {
		let user = message.client.user;
		if (idler.hasPlayer(user.id)) {
			message.reply('you are already a registered player!');
		}
		else {
			idler.addPlayer(user.id, user.username);
			message.reply('you are now playing PokemonIdle, good luck!');
		}
	}
	
});

dotenv.config({path: 'boo.env'});
client.login(process.env.BOO_TOKEN);

