const mongo = require('../../mongo');
const languageSchema = require('../../schemas/language-schema');
const { languages } = require('./../../lang.json');
const { setLanguage } = require('../../middleware/language')


module.exports = {
    name: 'set-language',
    description: 'Change Language of the bot',
    aliases: ['language', 'lang', 'setlang'],
    usage: '<Language>',
    permissions: ['MANAGE_GUILD'],
    cooldown: 15,
    args: true,
    async execute(message, args) {

        const {guild} = message;
        const targetLanguage = args[0].toLowerCase();
        if (!languages.includes(targetLanguage)) {
            message.reply('That language is not supported.')
            return
        }

        setLanguage(guild, targetLanguage)

        await mongo().then(async (mongoose) => {
            try {
                await languageSchema.findOneAndUpdate(
                    {
                        _id: guild.id,
                    },
                    {
                        _id: guild.id,
                        language: targetLanguage,
                    },
                    {
                        upsert: true,
                    }
                )

                message.reply('Language set!').then((message) => {
                })
            } finally {
                await mongoose.connection.close()
            }
        })
    },
};