module.exports = {
    name: "removexp",
    type: 1,
    description: "remove xp",
    options: [
        {
            name: "target",
            description: "remove xp to this user",
            type: 6,
            required: true,
            choices: [],
        },
        {
            name: "amount",
            description: "The amount",
            type: 4,
            required: true,
            choices: [],
        },
    ],

    /**
     *
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const user = interaction.options.getUser("target");
        const amount = interaction.options.getInteger("amount");

        let level = await interaction.client.Levels.subtractXp(
            user.id,
            interaction.guild.id,
            amount
        );

        return interaction.followUp({ content: "L'xp a été retirer" });
    },
};
