
module.exports = {
    name: 'repeat',
    aliases: ['r'],
    async execute(message, args, distube) {
        let mode = distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        message.channel.send("Set repeat mode to `" + mode + "`");
    },
};