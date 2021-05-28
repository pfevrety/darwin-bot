const {MessageEmbed} = require('discord.js')
const ms = require("ms")
const language = require('../../middleware/language')

module.exports = {
    name: 'kick',
    args: true,
    description: 'Kick someone',
    cooldown: 1,
    usage: '<@pseudo> <time>',
    permissions: ['KICK_MEMBERS'],
    async execute(message, args) {
        const target = message.mentions.users.first()
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.reply(language(message.guild, "KICK_SUCCEED"))
        } else {
            message.channel.send(language(message.guild, "KICK_FAILED"))
        }
    }
};
