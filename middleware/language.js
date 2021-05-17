const mongo = require('../mongo')
const languageSchema = require('../schemas/language-schema')
const lang = require('../lang.json')

const guildLanguages = {}

const loadLanguages = (message, language) => {
    guildLanguages[message.guild.id] = language
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
