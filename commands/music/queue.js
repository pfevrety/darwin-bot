module.exports = {
    name: 'queue',
    aliases: ['queu', 'q', 'getqueue'],
    async execute(message, args, distube) {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
        ).join("\n"));

    },
};