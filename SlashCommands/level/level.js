const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "level",
    type: 1,
    description: "Get level",
    options: [
        {
            name: "target",
            description: "the level of the user",
            type: 6,
            required: false,
            choices: [],
        },
    ],

    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const user =
            interaction.options.getMember("target") || interaction.member;

        let level = await interaction.client.Levels.fetch(
            user.user.id,
            interaction.guild.id,
            true
        );

        if (!level) {
            await interaction.client.Levels.createUser(
                user.user.id,
                interaction.guild.id
            );
            level = await interaction.client.Levels.fetch(
                user.user.id,
                interaction.guild.id,
                true
            );
        }

        const rank = new Canvacord.Rank()
            .setAvatar(user.user.displayAvatarURL({ format: "png", size: 512 }))
            .setCurrentXP(level.xp) // Current User Xp
            .setRequiredXP(user.client.Levels.xpFor(level.level + 1)) // We calculate the required Xp for the next level
            .setRank(level.position) // Position of the user on the leaderboard
            .setLevel(level.level) // Current Level of the user
            .setStatus(
                user.presence === null ? "offline" : user.presence.status
            ) // Current Status of the user
            .setProgressBar("#FFFFFF")
            .setUsername(user.user.username)
            .setDiscriminator(user.user.discriminator);

        rank.build().then((buffer) => {
            const attachment = new MessageAttachment(buffer, "rank.png");
            const r = interaction.followUp({ files: [attachment] });
            setTimeout(() => {
                r.delete();
            }, 30000);
        });
    },
};
