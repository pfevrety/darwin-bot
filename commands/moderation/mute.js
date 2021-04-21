const { MessageEmbed } = require('discord.js')
const ms = require("ms")

module.exports = {
    name: 'mute',
    args: true,
    aliases: [],
    description: 'Mute someone',
    cooldown: 1,
    name: 'mute',
    usage: '<@pseudo> <time>',
	async execute(message, args) {
         let user = message.guild.member(message.mentions.users.first());
    let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');
    let muteTime = (args[1] || '30s')

    if(!muteRole){
        muteRole = await message.guild.roles.create({
            data: {
                name: 'muted',
                color: '#fff',
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
    await user.roles.add(muteRole.id);
    message.channel.send(`<@${user.id}> est muté pour ${ms(ms(muteTime))}.`)*

    setTimeout(() => {
        user.roles.remove(muteRole.id);
    }, ms(muteTime));
    }
};
