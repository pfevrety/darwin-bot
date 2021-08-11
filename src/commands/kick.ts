import { Command, PieceContext } from '@sapphire/framework';
import { MessageEmbed, CommandInteraction, MessageButton, MessageActionRow, Message, ColorResolvable, EmojiResolvable } from 'discord.js';

module.exports = class PingCommand extends Command {
    constructor(context: PieceContext) {
        super(context, {
            aliases: ['k'],
            description: 'Kick someones.',
            runIn: null,
            requiredClientPermissions: ['KICK_MEMBERS'],
        });
    }

    async run(message: Message): Promise<void> {
        const user = message.mentions.users.first();
        const reason = 'Lorem Ipsum dolor si amet dolor sit amet';
        const description = 'Etes vous sur de vouloir bannir cette utilisateur ?';

        const embed = new MessageEmbed()
            .setTitle(`Ban de <@${user.id}>`)
            .setDescription(description)
            .addFields(
                { name: 'Utilisateur', value: `<@${user.id}>` },
                { name: 'Raison', value: '`' + reason + '`'},
                { name: 'Autheur', value: `<@${message.author.id}>` }
            )
            .setColor('#d62828')
            .setTimestamp()
            .setFooter(`Darwin - pfevrety#1908`);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('unban')
                    .setLabel('Annuler')
                    .setStyle('PRIMARY')
                    .setEmoji('☮️')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('ban')
                    .setLabel('Bannir')
                    .setStyle('DANGER')
                    .setEmoji('💥')
            );

        const response = await message.channel.send({ embeds: [embed], components: [row] });
    }
};