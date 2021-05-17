const { Guild } = require('discord.js');
const mongo = require('./../../mongo')
const guildSchema = require('../../schemas/guild-schema')
const language = require('../../middleware/language')

module.exports = {
    name: 'set-welcome',
    aliases: [],
    description: 'set welcome msg',
    cooldown: 10,
    permissions: ['ADMINISTRATOR'],
    usage: "set-welcome",
    async execute(message, args) {
        console.log("Running the command")
        if (args.length < 2) return message.channel.send("Please provide a valid welcome message")

        await mongo().then(async (mongoose) => {
            try {
                await guildSchema.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    _id: message.guild.id,
                        welcomeChannelId: message.channel.id,
                        welcomeMessage: args.join(' '),
                }, {
                   upsert: true, 
                })
                message.channel.send(language(message.guild, "SET_WELCOME_SUCCEED").replace("{newMessage}", args.join(' ')))
            } finally {
                mongoose.connection.close()
            }
        })
    }
};
