const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "tempmute",
    description: "tempmute someone",
    type: 1,
    userPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name: "target",
            description: "The ban target",
            type: 6,
            required: true,
            choices: [],
        },
        {
            name: "time",
            description: "The ban time in days",
            type: 3,
            required: true,
            choices: [],
        },
        {
            name: "reason",
            description: "The reason of the ban",
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
    run: async (interaction) => {
        const user = interaction.options.getMember("target");
        const reason =
            interaction.options.getString("reason") === null
                ? "Non donnée"
                : interaction.options.getString("reason");

        const time = interaction.options.getString("time");

        const role = await interaction.guild.roles.cache.find(
            (role) => role.name === "Muted"
        );

        let muteRole;
        if (role === undefined) {
            try {
                muteRole = await interaction.guild.roles.create({
                    name: "Muted",
                    color: "#747572",
                    permissions: ["VIEW_CHANNEL", "CONNECT"],
                    mentionable: false,
                    reason: "Muted role creation for /mute",
                });
            } catch (error) {
                console.log(error);
            }
        }

        try {
            await user.roles.add(role === undefined ? muteRole : role);
        } catch (error) {
            console.log(error);
        }

        const embed = new MessageEmbed()
            .setTitle(`Mute de ${user.user.username}#${user.user.tag}!`)
            .setDescription("Un utilisateur a été mute !")
            .addFields(
                { name: "Utilisateur", value: `<@${user.id}>` },
                { name: "Raison", value: "`" + reason + "`" },
                {
                    name: "Durée",
                    value: `\`\`${time}\`\``,
                },
                { name: "Autheur", value: `<@${interaction.user.id}>` }
            )
            .setColor("#d62828")
            .setTimestamp()
            .setFooter(`Darwin - pfevrety#1908`);

        interaction.followUp({ embeds: [embed] });

        setTimeout(async () => {
            if (
                user.roles.cache.find((role) => role.name === "Muted") !==
                undefined
            ) {
                return await user.roles.remove(
                    role === undefined ? muteRole : role
                );
            }
        }, ms(time));
    },
};
