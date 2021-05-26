const { MessageEmbed } = require('discord.js')
const ms = require("ms")

module.exports = {
    name: 'unmute',
    args: true,
    aliases: [],
    description: 'Unmute someone',
    cooldown: 1,
    usage: '<@pseudo>',
	async execute(message, args) {
             let user = message.guild.member(message.mentions.users.first());
    let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');

    if(!user.roles.cache.has(muteRole.id)) return message.channel.send(`<@${user.id}> n'est pas muté`)
    user.roles.remove(muteRole.id);
    message.channel.send(language(message.guild, "UNMUTE_SUCCEED").replace("user", user.id));
    }
};
