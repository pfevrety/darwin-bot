const mongo = require('../../mongo')
const commandPrefixSchema = require('../../schemas/command-prefix-schema')

// Importing command-base so we have access to the
// "updateCache" function which I forgot to cover in the video
const handler = require("../../middleware/handler");

module.exports = {
    name: 'set-prefix',
    description: 'List all of my commands or info about a specific command.',
    aliases: ["prefix", "setprefix"],
    args: true,
    permissions: 'ADMINISTRATOR',
    async execute(message, args) {
        await mongo().then(async (mongoose) => {
            try {
                const guildId = message.guild.id
                const prefix = args[0]

                await commandPrefixSchema.findOneAndUpdate(
                    {
                        _id: guildId,
                    },
                    {
                        _id: guildId,
                        prefix,
                    },
                    {
                        upsert: true,
                    }
                )

                message.reply(`The prefix for this bot is now ${prefix}`)

                // Update the cache
                handler().updateCache(guildId, prefix)
            } finally {
                await mongoose.connection.close()
            }
        })
    },
}