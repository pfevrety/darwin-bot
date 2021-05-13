const { connect } = require('mongoose')
const mongo = require('../../mongo')
const welcomeSchema = require('../../schemas/welcome-schema')

module.exports = {
    name: 'welcome',
    description: 'List all of my commands or info about a specific command.',
    aliases: [],
    usage: '[command name]',
    cooldown: 5,
    async execute(message, args) {
        const guild = message.guild
        console.log('FETCHING FROM DB')
        let data;
            await mongo().then(async (mongoose) => {
                try {
                    const result = await welcomeSchema.findOne({ _id: guild.id })
                    message.guild.channels.cache[guild.id] = data = [result.channelId, result.text]
                } finally {
                    mongoose.connection.close()
                }
            })
        
        const channelId = data[0]
        const text = data[1]
        const channel = message.guild.channels.cache.get(data[0])
        channel.send(`${text.replace("<@>", "<@"+message.member.id+ ">")}`)
  },
};
