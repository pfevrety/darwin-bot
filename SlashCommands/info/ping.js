const {
    MessageEmbed,
    Message,
    ColorResolvable,
    EmojiResolvable,
} = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (interaction, args) => {
        const embed = new MessageEmbed()
            .setTitle("Calcul du ping en cours:")
            .setDescription("Calcul en cours")
            .setColor("#ffffff")
            .setTimestamp()
            .setFooter(`Darwin - pfevrety#1908`);

        const response = await interaction.followUp({ embeds: [embed] });

        const latency =
            response.createdTimestamp - interaction.createdTimestamp;
        const botPing = interaction.client.ws.ping;

        let color = "#d62828";
        let emoji = "🤔";

        if (latency < 100) {
            color = `#8ac926`;
            emoji = `👌`;
        } else if (latency > 100 && latency < 300) {
            color = `#ffca3a`;
            emoji = `🤙`;
        }

        embed.setDescription(
            `***Calcul du ping...***\n\uD83D\uDC77 Ping du bot: \`\`${latency}\`\`.\n⚙ Ping lantence de l'API discord: \`\`${botPing}\`\`.`
        );
        embed.setColor(color);

        interaction.editReply({ embeds: [embed] });
        response.react(emoji);
    },
};
