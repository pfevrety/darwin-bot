module.exports = {
    name: 'play',
    aliases: ['music'],
    description: 'Get the ping of the bot',
    execute(message, args, distube) {
        distube.play(message, args.join(' '))
    },
};