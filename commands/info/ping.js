const { MessageEmbed, Message, ColorResolvable, EmojiResolvable } = require('discord.js');

module.exports = {
    name: "ping",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send(`${message.client.ws.ping} ws ping`);
    },
};
