const { Client, Collection } = require("discord.js");
const Levels = require("discord-xp");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.Levels = Levels;

client.Levels.setURL(client.config.mongoURL);
// Initializing the project
require("./handler")(client);

client.login(client.config.token);
