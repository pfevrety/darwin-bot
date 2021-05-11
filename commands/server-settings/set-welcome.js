const { Guild } = require('discord.js');
const mongo = require('./../../mongo')
const welcomeSchema = require('./../../schemas/welcome-schema')

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
                await welcomeSchema.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    _id: message.guild.id,
                        channelId: message.channel.id,
                        text: args.join(' '),
                }, {
                   upsert: true, 
                })
                message.channel.send(`Le message de bienvenue à été modifié en : "${args.join(' ')}"`)
            } finally {
                mongoose.connection.close()
            }
        })
    }
};
