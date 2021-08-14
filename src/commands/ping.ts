import { Command, PieceContext } from '@sapphire/framework';
import { MessageEmbed, Message, ColorResolvable, EmojiResolvable } from 'discord.js';

module.exports = class PingCommand extends Command {
    constructor(context: PieceContext) {
        super(context, {
            aliases: ['pong'],
            description: 'Tests the latency.',
            runIn: null,
        });
    }

    async run(message: Message): Promise<void> {
        const embed = new MessageEmbed()
            .setTitle('Calcul du ping en cours:')
            .setDescription('Calcul en cours')
            .setColor('#ffffff')
            .setTimestamp()
            .setFooter(`Darwin - pfevrety#1908`);

        const response = await message.channel.send({ embeds: [embed] });


        const latency = response.createdTimestamp - message.createdTimestamp;
        const botPing = message.client.ws.ping;


        let color: ColorResolvable = '#d62828';
        let emoji: EmojiResolvable = '🤔';

        if (latency < 100) {
            color = `#8ac926`;
            emoji = `👌`;
        } else if (latency > 100 && latency < 300) {
            color = `#ffca3a`
            emoji = `🤙`;
        }

        embed.setDescription(`***Calcul du ping...***\n\uD83D\uDC77 Ping du bot: \`\`${latency}\`\`.\n⚙ Ping lantence de l'API discord: \`\`${botPing}\`\`.`)
        embed.setColor(color);

        response.edit({ embeds: [embed] });
        response.react(emoji);
    }
};