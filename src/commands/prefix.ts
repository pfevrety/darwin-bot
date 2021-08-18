import { Command, PieceContext } from '@sapphire/framework';
import { MessageEmbed, Message, ColorResolvable, EmojiResolvable } from 'discord.js';

module.exports = class PingCommand extends Command {
    constructor(context: PieceContext) {
        super(context, {
            aliases: ['set-prefix'],
            description: 'Change prefix.',
        });
    }

    async run(message: any, args: any): Promise<void> {
        if (args.length === 0) {
            return message.channel.send(`Currently the prefix for the guild is ${message.client.fetchPrefix}.`);
        }
        else {
            const newPrefix = args[0];
        }
    }
};