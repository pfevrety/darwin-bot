const language = require('../../middleware/language')

module.exports = {
    name: 'jump',
    aliases: ['j'],
    description: 'Get the ping of the bot',
    async execute(message, args, distube) {
        try{
            distube.jump(message, parseInt(args[0])).then(message.channel.send(`${language(message.guild, "MUSIC_JUMP_SUCCEED")}`))
        } catch (e) {
            message.channel.send(`${language(message.guild, "MUSIC_JUMP_INVALID_SONG")}`)
        }
    },
};