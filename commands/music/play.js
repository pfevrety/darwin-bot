const language = require('../../middleware/language')

module.exports = {
    name: 'play',
    aliases: ['music', 'p'],
    usage: '<url>',
    async execute(message, args, distube) {
        const string = args.join(" ")
        if (!string) return message.channel.send(`${language(message.guild, "MUSIC_PLAY_NO_QUERY")}`)
        distube.play(message, string).then(message.channel.send(`${language(message.guild, "MUSIC_PLAY_ADD")}`))
    },
};