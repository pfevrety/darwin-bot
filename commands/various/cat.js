const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    aliases: [],
    description: 'cat photo',
    cooldown: 1,
    name: 'cat',
	async execute(message, args) {
             const cat = await fetch('https://aws.random.cat/meow').then(response => response.json());
        message.channel.send(cat.file)}
};
