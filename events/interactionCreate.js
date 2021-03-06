const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error ghas occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        if (!interaction.inGuild())
            return interaction.followUp({
                content: "Vous devez executer la commande dans une guild",
            });

        if (!interaction.member.permissions.has(cmd.userPermissions || []))
            return interaction.followUp({
                content: "Tu n'as pas la permission",
            });

        try {
            return cmd.run(interaction, args);
        } catch (err) {
            interaction.followUp({ content: `il y a eut une erreur ${err}` });
        }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
