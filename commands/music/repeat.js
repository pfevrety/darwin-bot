const language = require('../../middleware/language');

module.exports = {
    name: 'repeat',
    aliases: ['r'],
    async execute(message, args, distube) {
        let mode = distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        message.channel.send( language(message.guild, "MUSIC_REPEAT_SET") + mode + "`");
    },
};