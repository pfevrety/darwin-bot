const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
    name: "clear",
    type: 1,
    description: "clear messages",
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "amout",
            description: "The kick target",
            type: 4,
            required: true,
            choices: []
        },
        {
            name: "author",
            description: "The message author",
            type: 6,
            required: false,
            choices: []
        }
    ],

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (interaction, args) => {
        const user = interaction.options.getUser('author');
        const amount = interaction.options.getInteger('amout') > 100 ? 100 : interaction.options.getInteger('amout');


        let messages;
        if (user != null) {
            messages = (await interaction.channel.messages.fetch({ limit: amount })).filter(
                (m) => m.member.id === user.id
              );
        } else {
            messages = amount;
        }

        await interaction.channel.bulkDelete(messages, true);

        const embed = new MessageEmbed()
            .setTitle(`${amount} messages supprimés`)
            .setDescription(`${amount} messages ont bien été supprimés!`)
            .addFields(
                { name: "Utilisateur", value: user != null ? "test" : "Pas d'utilisateur spéciéfié" },
                { name: "Channel", value: "<#" + interaction.channel.id + ">"},
                { name: "Nombre", value: `${amount} messages supprimés`},
                { name: "Autheur", value: "<@" + interaction.user + ">"}
            )
            .setColor("#f3f3f3")
            .setTimestamp()
            .setFooter(`Darwin - pfevrety#1908`);

        return interaction.channel.send({
            embeds: [embed]
        });
    },
};
