const guildSchema = require("../schemas/guild-schema");
const mongo = require('../mongo');

module.exports = {
    name: 'guildCreate',
    async execute(guild ,client) {
        await mongo().then(async (mongoose) => {
            try {
                await guildSchema.findOneAndUpdate(
                    {
                        _id: guild.id,
                    },
                    {
                        _id: guild.id,
                        welcomeMessage: "default",
                        language: "english",
                        prefix: ".",
                        invite_leaderboard: false,
                        xpSystem: false,
                        xpRate: false
                    },
                    {
                        upsert: true,
                    }
                )
            } finally {
                await mongoose.connection.close()
            }
        })
    }
};