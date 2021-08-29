const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "unmute",
    description: "unmute someone",
    type: 1,
    options: [
        {
            name: "target",
            description: "The ban target",
            type: 6,
            required: true,
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

        const role = await interaction.guild.roles.cache.find(
            (role) => role.name === "Muted"
        );

        if (user.roles.cache.has(role.id)) {
            try {
                user.roles.remove(role);
            } catch (e) {
                console.log(e);
            }
        }

        const embed = new MessageEmbed()
            .setTitle(`Un utilisateur a été demute!`)
            .setDescription(`${user} a été démute!`)
            .setColor("#d62828")
            .setTimestamp()
            .setFooter(`Darwin - pfevrety#1908`);

        interaction.followUp({ embeds: [embed] });
    },
};
