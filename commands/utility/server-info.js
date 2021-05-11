const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'server-info',
    args: false,
    aliases: ['server', 'serverinfo', 'sinfo'],
    description: 'Return Server Info',
    cooldown: 10,
	async execute(message, args) {
         let region;
         switch (message.guild.region) {
            case "eu-west":
                region = '🇪🇺 Europe';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
            case "brazil":
                region = "🇧🇷 Brazil"
                break;
            case "hong-kong":
                region = "🇭🇰 Hong Kong"
                break;
            case "india":
                region = "🇮🇳 India"
                break;
            case "japan":
                region = "🇯🇵 Japan"
                break;
            case "russia":
                region = "🇷🇺 Russia"
                break;
            case "singapore":
                region = "🇸🇬 Singapore"
                break;
            case "south-africa":
                region = "🇿🇦 South Africa"
                break;
            case "sydney":
                region = "🇦🇺 Sydney"
                break
            default:
                region = "🌎 World"
                 break;
        };
        
        let Owner;
        const roles = message.guild.roles.cache.array().length <= 8 ? message.guild.roles.cache.array().slice(0, 8).join(', ') : message.guild.roles.cache.array().length > message.guild.roles.cache.array().slice(0, 8).length ? `${message.guild.roles.cache.array().slice(0, 8).join(', ')}, and ${message.guild.roles.cache.array().length - 8} more` : "None";
        try {
            owner = message.guild.owner.user.tag;
        } catch {
            owner = "Undefined";
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#f3f3f3')
            .setTitle(`${message.guild.name} server stats`)
            .addFields(
                {
                    name: "Owner: ",
                    value: Owner,
                    inline: true
                },
                {
                    name: "Members: ",
                    value: `There are ${message.guild.memberCount} users!`,
                    inline: true
                },
                {
                    name: "Members Online: ",
                    value: `There are ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} users online!`,
                    inline: true
                },
                {
                    name: "Total Bots: ",
                    value: `There are ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                    inline: true
                },
                {
                    name: "Creation Date: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "Roles Count: ",
                    value: `There are ${message.guild.roles.cache.size} roles in this server.`,
                    inline: true,
                },
                {
                    name: "Roles: ",
                    value: roles,
                    inline: true

                },
                {
                    name: `🗺 Region: `,
                    value: region,
                    inline: true
                },
                {
                    name: `Verified: `,
                    value: message.guild.verified ? 'Server is verified' : `Server isn't verified`,
                    inline: true
                },
                {
                    name: 'Boosters: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `There are ${message.guild.premiumSubscriptionCount} Boosters` : `There are no boosters`,
                    inline: true
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `There are ${message.guild.emojis.cache.size} emojis!` : 'There are no emojis' ,
                    inline: true
                }
            )
        await message.channel.send(embed);
    }
};
