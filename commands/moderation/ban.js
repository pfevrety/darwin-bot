const language = require('../../middleware/language')

module.exports = {
    name: 'ban',
    args: true,
    description: 'Ban someone',
    cooldown: 1,
    usage: '<@pseudo> <time>',
    permissions: ['KICK_MEMBERS'],
    async execute(message, args) {
        const target = message.mentions.users.first()
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(language(message.guild, "BAN_SUCCEED"))
        } else {
            message.channel.send(language(message.guild, "BAN_FAILED"))
        }
    }
};

