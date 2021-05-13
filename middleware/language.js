const mongo = require('../mongo')
const languageSchema = require('../schemas/language-schema')
const lang = require('../lang.json')

const guildLanguages = {}

const loadLanguages = async (message, client) => {
    await mongo().then(async (mongoose) => {
        try {
            for (const guild of client.guilds.cache) {

                const guildId = message.guild.id

                const result = await languageSchema.findOne({
                    _id: guildId,
                })

                guildLanguages[guildId] = result ? result.language : 'english'
            }
        } finally {
            mongoose.connection.close()
        }
    })
}

const setLanguage = (guild, language) => {
    guildLanguages[guild.id] = language.toLowerCase()
}

module.exports = (guild, textId) => {
    if (!lang.translations[textId]) {
        throw new Error(`Unknown text ID "${textId}"`)
    }

    const selectedLanguage = guildLanguages[guild.id].toLowerCase()
    return lang.translations[textId][selectedLanguage]
}

module.exports.loadLanguages = loadLanguages
module.exports.setLanguage = setLanguage
