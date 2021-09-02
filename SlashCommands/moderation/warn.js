const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "warn",
    type: 1,
    description: "clear messages",
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "target",
            description: "The warn target",
            type: 6,
            required: true,
            choices: [],
        },
        {
            name: "reason",
            description: "The warn reason",
            type: 3,
            required: false,
            choices: [],
        },
    ],

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (interaction, args) => {
        const user = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason");

        const embed = new MessageEmbed()
            .setTitle(`${user.username} a été warn!`)
            .setDescription(`Un utilisateur a été warn!`)
            .addFields(
                { name: "Utilisateur", value: "<@" + user + ">" },
                {
                    name: "Raison",
                    value: `\`\`${reason ? reason : "Non définie"}\`\``,
                },
                {
                    name: "Nombre de warn au total",
                    value: "``" + "2" + " warns``",
                },
                {
                    name: "Autheur du warn",
                    value: "<@" + interaction.user + ">",
                }
            )
            .setThumbnail(user.avatarURL())
            .setColor("#f3f3f3")
            .setTimestamp()
            .setFooter(`Darwin - pfevrety#1908`);

        const response = await interaction.channel.send({
            embeds: [embed],
        });

        response.react("🥶");
        response.react("😱");
        return response.react("💥");
    },
};
