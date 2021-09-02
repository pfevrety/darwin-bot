const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
    name: "ban",
    description: "ban someone",
    type: 1,
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: "target",
            description: "The ban target",
            type: 6,
            required: true,
            choices: []
        },
        {
            name: "reason",
            description: "The reason of the ban",
            type: 3,
            required: false,
            choices: []
        },
        {
            name: "time",
            description: "The ban time in days",
            type: 4,
            required: false,
            choices: []
        },

    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (interaction, args) => {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') === null ? "Non donnée" : interaction.options.getString('reason');

        const time = interaction.options.getInteger('time') === null ? 0 : interaction.options.getInteger('time') % 7;

        const embed = new MessageEmbed()
            .setTitle(`Ban de ${user.username}#${user.tag}!`)
            .setDescription('Etes vous sur de vouloir bannir cette utilisateur ?')
            .addFields(
                { name: 'Utilisateur', value: `<@${user.id}>` },
                { name: 'Raison', value: '`' + reason + '`' },
                { name: 'Durée', value: "``" + time === 0 ? "Définitif" : `${time} days` + "``"},
                { name: 'Autheur', value: `<@${interaction.user.id}>` }
            )
            .setColor('#d62828')
            .setTimestamp()
            .setFooter(`Darwin - pfevrety#1908`);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('unban')
                    .setLabel('Annuler')
                    .setStyle('PRIMARY')
                    .setEmoji('☮️')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('ban')
                    .setLabel('Bannir')
                    .setStyle('DANGER')
                    .setEmoji('💥')
            );

        const response = await interaction.followUp({ embeds: [embed], components: [row] });

        const filter = (interaction) => {
            if (interaction.user.id === interaction.user.id) return true;
            return interaction.reply({ content: 'Vous ne pouvez pas utiliser ce bouton', ephemeral: true });
        };

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            max: 1,
        });

        collector.on('end', async (ButtonInteraction) => {
            if (ButtonInteraction.first().customId === 'ban') {
                try {
                    interaction.guild.members.ban(user, { reason, days: time});
                    embed.setDescription('L\'utilisateur a été Banni !');
                    response.react('💥');
                    response.react('😱');
                    return ButtonInteraction.first().update({ embeds: [embed], components: [] });
                } catch (e) {
                    embed.setDescription(`Il y a eut une erreur ${e}.`);
                    return ButtonInteraction.first().update({ embeds: [embed], components: [] });
                }
            } else {
                embed.setDescription('L\'utilisateur n\'a pas été Banni !');
                embed.setColor('#8ac926');
                response.react('☮️');
                response.react('👍');
                return ButtonInteraction.first().update({ embeds: [embed], components: [] });
            }
        });
    },
};
