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
    async execute(message, args) {
        let user = message.guild.member(message.mentions.users.first());
        let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
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
            await user.roles.add(muteRole.id);
            message.channel.send(language(message.guild, "MUTE_SUCCEED").replace("user", user.id).replace("{time}", ms(ms(muteTime))))
        } catch (e) {
            message.channel.send(language(message.guild, "MUTE_FAILED"))
        }
        setTimeout(() => {
            user.roles.remove(muteRole.id);
        }, ms(muteTime));
    }
};
