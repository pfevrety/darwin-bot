module.exports = {
    name: "removelevel",
    type: 1,
    description: "remove level",
    options: [
        {
            name: "target",
            description: "remove level to this user",
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
    run: async (interaction ) => {
        const user = interaction.options.getUser("target");
        const amount = interaction.options.getInteger("amount");

        let level = await interaction.client.Levels.subtractLevel(
            user.id,
            interaction.guild.id,
            amount
        );

        interaction.followUp({ content: "Les niveaux ont été retirés"});
    },
};
