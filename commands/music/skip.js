const language = require('../../middleware/language');

module.exports = {
    name: 'skip',
    aliases: ['next'],
    description: 'Get the ping of the bot',
    execute: function (message, args, distube) {
        distube.skip(message);
        return message.reply(language(message.guild, "COMMAND_SUCCESS"))
    },
};