module.exports = {
    name: 'stop',
    aliases: ['quit'],
    description: 'Get the ping of the bot',
    execute(message, args, distube) {
        distube.stop(message, args.join(' '))
        distube.stop(message);
        message.channel.send(language(message.guild, "MUSIC_STOP_SUCCEED"));
    },
};