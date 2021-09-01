const client = require("../index");

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;

    const hasLeveledUp = await message.client.Levels.appendXp(
        message.author.id,
        message.guild.id,
        9
    );

    if (hasLeveledUp) {
        const user = await message.client.Levels.fetch(
            message.author.id,
            message.guild.id
        );

        message.reply(
            `Felicitation ${message.author} vous venez de passer niveau ${user.level}. Pour consulter votre xp faite /level`
        );
    }
    // const [cmd, ...args] = message.content
    //     .slice(client.config.prefix.length)
    //     .trim()
    //     .split(" ");

    // const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    // if (!command) return;
    // await command.run(client, message, args);
});
