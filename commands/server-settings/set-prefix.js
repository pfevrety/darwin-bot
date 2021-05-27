const mongo = require('../../mongo')
const guildSchema = require('../../schemas/guild-schema')
const language = require('../../middleware/language')
const handler = require("../../middleware/handler");

module.exports = {
    name: 'set-prefix',
    description: 'List all of my commands or info about a specific command.',
    aliases: ["prefix", "setprefix"],
    args: true,
    permissions: ['ADMINISTRATOR'],
    async execute(message, args) {
        await mongo().then(async (mongoose) => {
            try {
                const guildId = message.guild.id
                const prefix = args[0]

                await guildSchema.findOneAndUpdate(
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

                message.reply(language(message.guild, "SET_PREFIX_SUCCEED").replace("{prefix}", prefix))

                // Update the cache
                handler().updateCache(guildId, prefix)
            } finally {
                await mongoose.connection.close()
            }
        })
    },
}