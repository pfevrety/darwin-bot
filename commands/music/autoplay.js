module.exports = {
    name: 'autoplay',
    usage: 'ON || OFF',
    description: 'Active autoplay',
    async execute(message, args, distube) {
        let mode = distube.toggleAutoplay(args.join(" "));
        try {
            message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
        } catch (e) {
            message.reply("``" + e + "``")
        }
    },
};