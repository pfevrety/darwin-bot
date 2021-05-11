const moment = require('moment')
module.exports = {
    name: 'hour',
    aliases: [],
    description: 'return hour',
    cooldown: 0.1,
	async execute(message, args) {
             var now = moment();
            var time = now.hour() + ':' + now.minutes() + ':' + now.seconds();
        message.channel.send(`Il est à l'heure de paris **\`\`${time}\`\`**`)
    }
};
