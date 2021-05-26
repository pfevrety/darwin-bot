const language = require('../../middleware/language');

module.exports = {
    name: 'queue',
    aliases: ['queu', 'q', 'getqueue'],
    async execute(message, args, distube) {
        let queue = distube.getQueue(message);
        message.channel.send(language(message.guild, "MUSIC_QUEUE_CURRENT") + queue.songs.map((song, id) =>
            `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
        ).join("\n"));

    },
};