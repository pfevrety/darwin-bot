const language = require('../../middleware/language')

module.exports = {
    name: 'autoplay',
    usage: 'ON || OFF',
    description: 'Active autoplay',
    async execute(message, args, distube) {
        let mode = distube.toggleAutoplay(args.join(" "));
        message.channel.send(`${language(message.guild, "MUSIC_AUTOPLAY_SET")} \`\`${(mode ? "On" : "Off")}\`\``);

    },
};