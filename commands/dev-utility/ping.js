const language = require('../../middleware/language')

module.exports = {
    name: 'ping',
    aliases: ['latence'],
    description: 'Get the ping of the bot',
    execute(message, args) {
        message.channel.send(language(message.guild, 'PING_INFO').replace("{ping1}", Math.abs(Date.now() - message.createdTimestamp)).replace("{ping2}", message.client.ws.ping))
    },
};