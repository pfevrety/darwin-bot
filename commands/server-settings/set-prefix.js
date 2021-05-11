const mongo = require('../../mongo')
const commandPrefixSchema = require('../../schemas/command-prefix-schema')
const handler = require('../../index')



module.exports = {
    name: 'set-prefix',
    description: 'List all of my commands or info about a specific command.',
    aliases: ["prefix", "setprefix"],
    usage: '<New prefix>',
    permissions: ['MANAGE_GUILD'],
    cooldown: 15,
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
        
        handler.updateCache(guildId, prefix)
          
      } finally {
        mongoose.connection.close()
      }
    })
  },};
