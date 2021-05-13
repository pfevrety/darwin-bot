const mongo = require('./mongo')
const languageSchema = require('./schemas/language-schema')
const lang = require('./lang.json')

const guildLanguages = {}

const loadLanguages = async (message) => {
    await mongo().then(async (mongoose) => {
        try {
                const result = await languageSchema.findOne({ _id: message.guild.id })
                
                console.log(result)
            } finally {
            mongoose.connection.close();
        }
    })
}

module.exports.loadLanguages = loadLanguages