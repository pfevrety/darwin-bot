const Discord = require('discord.js');
const fs = require('fs');
const AsciiTable = require('ascii-table');
const chalk = require('chalk');
const mongo = require('./mongo');
const commandHandler = require('./middleware/handler')
const { TOKEN, USERNAME, ACTIVITY} = require('./config.json');
const client = new Discord.Client();
const commandFolders = fs.readdirSync('./commands');
const eventFolders = fs.readdirSync('./events')
const handler = require('./middleware/handler')
const { loadLanguages } = require('./middleware/language')
const { guildSettings } = require('./middleware/serverSettings')
const guildSchema = require('./schemas/guild-schema')
const DisTube = require('distube')

const distube = new DisTube(client)



client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Initialisation //

console.log(chalk.blue('Lancement du programme du bot...'));

// Activate mongodb => exec('"C:\\\\Program Files\\\\MongoDB\\\\Server\\\\4.4\\bin\\\\mongod.exe" --dbpath="c:\\\\data\\\\db"');


let commandsTable = new AsciiTable(chalk.black.bgYellowBright('Commands'));
commandsTable.setHeading(
    chalk.blue('ID'),
    chalk.magenta('Commands'),
    chalk.green('Load status'),
    chalk.yellow('Description')
);
let commandCounter = 0;

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

for (const folder of eventFolders) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${folder}/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}



// Ajout des toutes les commandes existantes //
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        try {
            client.commands.set(command.name, command);
            commandsTable.addRow(
                chalk.white(commandCounter),
                chalk.white("." + command.name),
                chalk.green('✅ Load with success'),
                chalk.white(command.description)
            );
        } catch (error) {
            commandsTable.addRow(
                chalk.white(commandCounter),
                chalk.white("." + command.name),
                chalk.red(`❌ Error ${error}`),
                chalk.white(command.description)
            );
        }
        commandCounter++;
    }
}

console.log(commandsTable.toString());
console.log(chalk.greenBright('Mise en cache des commandes réussie !'));

// Quand le bot est connecté à Discord //
client.on('ready', async () => {
    console.log(chalk.green("\Connection succeed!"));
    await client.user.setUsername(USERNAME);
    await client.user.setActivity(ACTIVITY);
    // Connection to MongoDB //
    await mongo().then((mongoose) => {
        try {
            console.log(chalk.yellow('Connected to Mongo'));
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
    const language = settings.language || "english"
    loadLanguages(message, language)
    commandHandler(message, message.client, Discord, prefix, distube);
});


// Se connecte à l'api //
client.login(TOKEN);
