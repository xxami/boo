
const dotenv = require('dotenv');
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	if (message.content === 'ping') {
		message.reply('boo');
	}
});

dotenv.config({path: 'boo.env'});
client.login(process.env.BOO_TOKEN);
