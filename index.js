const Discord = require('discord.js');
const fs = require('fs-extra');
const client = new Discord.Client();

const guildSchema = require('./schemas/guild-schema')

const { USERNAME, ACTIVITY } = require('./config.json');


const commandExecutator = require('./handler/commandsExecutator')
const events = require('./handler/eventsHandler');
const commands = require("./handler/commandHandler");
const mongo = require('./mongo');
const { loadLanguages } = require('./middleware/language')

require('dotenv').config()

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Initialisation //

console.log('Lancement du programme du bot...');

// Activate mongodb => exec('"C:\\\\Program Files\\\\MongoDB\\\\Server\\\\4.4\\bin\\\\mongod.exe" --dbpath="c:\\\\data\\\\db"');

// Load Commands and Events
commands.commandsFilterer(client, fs.readdirSync("./commands"));
events.eventsFilterer(client);

// Quand le bot est connecté à Discord //
client.on('ready', async () => {
    console.log("Connection succeed!");
    await client.user.setUsername(USERNAME);
    await client.user.setActivity(ACTIVITY);
    // Connection to MongoDB //
    await mongo().then((mongoose) => {
        try {
            console.log('Connected to Mongo');
        } catch (error) {
        } finally {
            mongoose.connection.close();
        }
    });
});

// Handler pour les commandes //
client.on('message', async (message) => {
    if (message.author.bot) return;
    let settings;
    await mongo().then(async (mongoose) => {
        try {
            const guildId = message.guild.id
            settings = await guildSchema.findOne({
                _id: guildId,
            })
        } finally {
            mongoose.connection.close()
        }
    })
    const prefix = settings.prefix || globalPrefix;
    const language = settings.language || "english";
    loadLanguages(message, language);
    commandExecutator(message, message.client, Discord, prefix);
});


// Se connecte à l'api //
client.login(process.env.TOKEN);
