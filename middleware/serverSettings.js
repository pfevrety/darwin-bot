const mongo = require('../mongo')
const guildSchema = require('../schemas/guild-schema')
const lang = require('../lang.json')
const guildPrefixes = require('../handler/commandsExecutator')

const guildLanguages = {}

const guildSettings  = async (message, client) => {
    await mongo().then(async (mongoose) => {
        let result;
        try {
                const guildId = message.guild.id
                 result = await guildSchema.findOne({
                 _id: guildId,
                })
        } finally {
            await mongoose.connection.close()
        }
    })
}

module.exports.updateCache = (guildId, newPrefix) => {
    guildPrefixes[guildId] = newPrefix
}

module.exports.loadPrefixes = async (message, client) => {
    await mongo().then(async (mongoose) => {
        try {
            for (const guild of client.guilds.cache) {
                const guildId = message.guild.id

                const result = await commandPrefixSchema.findOne({_id: guildId})
                guildPrefixes[guildId] = result.prefix;

            }
        } finally {
            await mongoose.connection.close()
        }
    })
}


module.exports.guildSettings = guildSettings
