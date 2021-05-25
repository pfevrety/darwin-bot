module.exports = {
    name: 'set-volume',
    aliases: ['v', 'volume'],
    execute(message, args, distube) {
        distube.setVolume(message, args[0]);
        message.reply(`Volume set to ${args[0]}!`)
    },
};