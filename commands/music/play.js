module.exports = {
    name: 'play',
    aliases: ['music', 'p'],
    usage: '<url>',
    async execute(message, args, distube) {
        const string = args.join(" ")
        if (!string) return message.channel.send(`Error | Please enter a song url or query to search.`)
        try {
            return distube.play(message, string)
        } catch (e) {
            console.log("e")
            return message.reply(`\`\`${e}\`\``)
        }
    },
};