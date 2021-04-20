const fetch = require('node-fetch');

module.exports = {
    name: 'useless',
    args: false,
    aliases: ['fun_fact', 'fun', 'fact'],
    description: 'Return useless fact',
    cooldown: 5,
	async execute(message, args) {
        const fact = await fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(response => response.json());
        message.reply(fact.text); 
    }
};
