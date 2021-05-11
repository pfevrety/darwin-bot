const mongo = require('../../mongo');
const languageSchema = require('../../schemas/language-schema');
const handler = require('../../index');
const { languages } = require('./../../lang.json');

module.exports = {
	name: 'set-language',
	description: 'Change Language of the bot',
	aliases: [ 'language', 'lang', 'setlang' ],
	usage: '<Language>',
	permissions: [ 'MANAGE_GUILD' ],
    cooldown: 15,
        args: true,

        
	async execute(message, args) {
		const { guild } = message;

		const targetLanguage = args[0];
		if (!languages.includes(targetLanguage)) {
			message.reply('Thats language is not supported');
			return;
		}

		await mongo().then(async (mongoose) => {
			try {
				await languageSchema.findOneAndUpdate(
					{
						_id: guild.id
					},
					{
						_id: guild.id,
						languages: targetLanguage
					},
					{
						upsert: true
					}
				);
				message.reply('Language set!');
			} catch (e) {
				console.log(e);
			} finally {
				mongoose.connection.close();
			}
		});
	}
};
