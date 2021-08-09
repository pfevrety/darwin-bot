const language = require("../../middleware/language");

module.exports = {
    name: 'unban',
    description: 'Unban a member',
    aliases: ['disban'],
    usage: '<user_id> <reason>',
    permissions: ['BAN_MEMBERS'],
    cooldown: 0,
    args: true,
    owner: false,
    guildOnly: true,
    async execute(message, args) {
        const id = args[0];

        await message.guild.members.unban(id, `${args.slice(1).join(' ')} : ${message.author.tag}`);

        message.channel.send(language(message.guild, "UNBAN_SUCCEED").replace('{user}', id))

    },
};