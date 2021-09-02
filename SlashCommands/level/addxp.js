module.exports = {
    name: "addxp",
    type: 1,
    description: "add xp",
    userPermissions: ["MANAGE_GUILD"],
    options: [
        {
            name: "target",
            description: "add xp to this user",
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

        let level = await interaction.client.Levels.appendXp(
            user.id,
            interaction.guild.id,
            amount
        );

        interaction.followUp({ content: "L'xp a été ajouter"});
    },
};
