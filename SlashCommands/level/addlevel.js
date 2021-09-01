module.exports = {
    name: "addlevel",
    type: 1,
    description: "add level",
    options: [
        {
            name: "target",
            description: "add level to this user",
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

        let level = await interaction.client.Levels.appendLevel(
            user.id,
            interaction.guild.id,
            amount
        );

        interaction.followUp({ content: "Le niveau a été ajouter"});
    },
};
