const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "leaderboard",
    type: 1,
    description: "Get xp leaderboard",
    /**
     *
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        let leaderboard = await interaction.client.Levels.computeLeaderboard(
            interaction.client,
            await interaction.client.Levels.fetchLeaderboard(
                interaction.guild.id,
                10
            )
        );

        const len = leaderboard.length < 10 ? leaderboard.length : 10;

        let embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(`${interaction.guild.name} Leaderboard`)
            .setDescription(`Classement des utilisateurs du serveur \`\`${interaction.guild.name}\`\` en fonction de leur niveau d'experience`)
            .setTimestamp()
            .setFooter(
                "Darwin - bot",
            );

        for (let i = 0; i < len; i++) {
            let counter = i;

            if (i <= 2) {
                if (i === 0) counter = "🥇";
                else if (i === 1) counter = "🥈";
                else counter = "🥉";
            }

            embed.addField(`${counter}.${leaderboard[i].username}#${leaderboard[i].discriminator}`, `<@${leaderboard[i].userID}> est niveau : **${leaderboard[i].level}** il a \`\`${leaderboard[i].xp}xp.\`\``);
        }

        interaction.followUp({ embeds: [embed] });
    },
};
