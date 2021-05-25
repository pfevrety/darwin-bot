module.exports = {
    name: 'jump',
    aliases: ['j'],
    description: 'Get the ping of the bot',
    async execute(message, args, distube) {
        distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("Invalid song number."));

    },
};