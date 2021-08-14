/* eslint-disable curly */
/* eslint-disable padding-line-between-statements */
import { Command, PieceContext } from '@sapphire/framework';
import { MessageEmbed, MessageButton, MessageActionRow, Message } from 'discord.js';

module.exports = class PingCommand extends Command {
    constructor(context: PieceContext) {
        super(context, {
            aliases: ['b'],
            description: 'ban someone.',
            runIn: null,
            requiredClientPermissions: ['BAN_MEMBERS'],
        });
    }

    async run(message: Message): Promise<void> {
        const user = message.mentions.users.first();
        const reason = 'Lorem Ipsum dolor si amet dolor sit amet';

        const embed = new MessageEmbed()
            .setTitle(`Ban de <@${user.id}>`)
            .setDescription('Etes vous sur de vouloir bannir cette utilisateur ?')
            .addFields(
                { name: 'Utilisateur', value: `<@${user.id}>` },
                { name: 'Raison', value: '`' + reason + '`' },
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

        const filter = (interaction: any) => {
            if (interaction.user.id === message.author.id) return true;
            return interaction.reply({ content: 'Vous ne pouvez pas utiliser ce bouton' })
        };

        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1,
        });

        collector.on('end', async (ButtonInteraction) => {
            if (ButtonInteraction.first().customId === 'ban'){
                try {
                    message.guild.members.ban(user, { reason : reason || 'No reason' });
                    embed.setDescription('L\'utilisateur a été Banni !');
                    response.react('💥');
                    response.react('😱');
                    return ButtonInteraction.first().reply({ embeds: [embed] });
                } catch (e) {
                    embed.setDescription(`Il y a eut une erreur ${e}.`);
                    return ButtonInteraction.first().reply({ embeds: [embed] });
                }
            } else {
                embed.setDescription('L\'utilisateur n\'a pas été Banni !');
                embed.setColor('#8ac926');
                response.react('☮️');
                response.react('👍');
                return ButtonInteraction.first().reply({ embeds: [embed] })
            }
        });
    }
};