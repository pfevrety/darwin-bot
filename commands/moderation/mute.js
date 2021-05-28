const {MessageEmbed} = require('discord.js')
const ms = require("ms")
const language = require('../../middleware/language')

module.exports = {
    name: 'mute',
    args: true,
    aliases: [],
    description: 'Mute someone',
    cooldown: 1,
    usage: '<@pseudo> <time>',
    permissions: ['MUTE_MEMBERS'],
    async execute(message, args) {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send("Invalid user.");
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        let muteTime = (args[1] || '5min')

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#747572',
                    permissions: [],
                }
            });
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.updateOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTION: false,
                    CONNECT: false
                })
            })
        }
        try {
            console.log(muteRole)
            await user.roles.add(muteRole);
            message.channel.send(language(message.guild, "MUTE_SUCCEED").replace("user", user.id).replace("{time}", ms(ms(muteTime))))
        } catch (e) {
            console.log(e)
            message.channel.send(language(message.guild, "MUTE_FAILED"))
        }
        setTimeout(() => {
            user.roles.remove(role);
        }, ms(muteTime));
    }
};
