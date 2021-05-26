const language = require('../../middleware/language');

module.exports = {
    name: 'seek',
    aliases: ['time'],
    usage: '[time: number]',
    async execute(message, args, distube) {
        try {
            distube.jump(message, parseInt(args[0]))
            return message.reply(language(message.guild, "COMMAND_SUCCESS"))
        } catch (e) {
            message.channel.send(language(message.guild, "MUSIC_SEEK_ERROR"))
        }
    },
};