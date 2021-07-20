const language = require('../../middleware/language')

module.exports = {
    name: 'ban',
    args: true,
    description: 'Bans a specified user from your Discord server.',
    cooldown: 0,
    usage: '<user>',
    permissions: ['BAN_MEMBERS'],
    guildOnly: true,
    async execute(message, args) {
        const target = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(language(message.guild, "BAN_SUCCEED"))
        } else {
            message.channel.send(language(message.guild, "BAN_FAILED"))
        }
    }
};

