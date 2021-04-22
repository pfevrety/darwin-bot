const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'user-info',
    args: false,
    aliases: ['user', 'userinfo', 'uinfo'],
    description: 'Return user Info',
    cooldown: 3,
    usage: "user",
    async execute(message, args) {
        let user =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let status;
        function emoji(id){
            return message.client.emojis.cache.get(id).toString();
        }

        console.log(user.presence.status)
        switch (user.presence.status) {
            case "online":
                status = "<:Online:834718808891457537> online";
                break;
            case "dnd":
                status = "<:DND:834718618708738098> dnd";
                break;
            case "idle":
                status = "<:Idle:834717874333548564> idle";
                break;
            case "offline":
                status = "<:Offline:834718288503898122> Offline";
                break;
        };

        const embed = new MessageEmbed()
            .setTitle(`${user.user.username} stats`)
            .setColor(`f3F3F3`)
            .setThumbnail(user.user.displayAvatarURL())
            .addFields(
                {
                    name: "Name: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Discriminator: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "🆔 ID: ",
                    value: user.user.id,
                },
                {
                    name: "Current Status: ",
                    value: status,
                    inline: true
                },
                {
                    name: "Activity: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                    inline: true
                },
                {
                    name: 'Avatar link: ',
                    value: `[Click Here](${user.user.displayAvatarURL()})`
                },
                {
                    name: 'Creation Date: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'Joined Date: ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'User Roles: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                });
        console.log(status)
        message.channel.send(embed)


    }
};
