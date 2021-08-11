const dotenv = require("dotenv");

dotenv.config();

const { SapphireClient } = require("@sapphire/framework");

const client = new SapphireClient({
    presence: {
        activity: {
            name: "for commands!",
            type: "LISTENING",
        },
    },
    intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.fetchPrefix = () => "!";

client.login(process.env.TOKEN).then(() => {
    console.log(`Logged in as ${client.user.username}!, `);
});
