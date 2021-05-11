const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const AsciiTable = require('ascii-table');
const chalk = require('chalk');
const mongo = require('./mongo');
const commandPrefixSchema = require('./schemas/command-prefix-schema');
const guildPrefixes = {};

const { loadLanguages } = require('./language')
const client = new Discord.Client();
const prefix = "."
const Token = 'NzYxNTk4MzkzMDA0NDU4MDA0.X3c7xg.XAtTnQKsMV-YI9vfp4LBU3zOFT0';

dotenv.config();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Initialisation //

console.log(chalk.blue('Lancement du programme du bot...'));

const commandFolders = fs.readdirSync('./commands');
let commandsTable = new AsciiTable(chalk.black.bgYellowBright('Commands'));
commandsTable.setHeading(
	chalk.blue('ID'),
	chalk.magenta('Commands'),
	chalk.green('Load status'),
	chalk.yellow('Description')
);
let counter = 0;

// Ajout des toutes les commandes existantes //
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		try {
			client.commands.set(command.name, command);
			commandsTable.addRow(
				chalk.white(counter),
				chalk.white("." + command.name),
				chalk.green('✅ Load with success'),
				chalk.white(command.description)
			);
		} catch (error) {
			commandsTable.addRow(
				chalk.white(counter),
				chalk.white("." + command.name),
				chalk.red(`❌ Error ${error}`),
				chalk.white(command.description)
			);
		}
		counter++;
	}
}
console.log(commandsTable.toString());
console.log(chalk.greenBright('Mise en cache des commandes réussie !'));

// Quand le bot est connecté à Discord //
client.on('ready', async () => {
	console.log(chalk.green("\nLa connection entre le bot et l'api Discord a été effectuée avec succès !"));
	console.log(chalk.yellow('Connection to Mongo'));
	// Connection à MongoDB //
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
	loadLanguages(message)
	const isInvite = async (guild, code) => {
		return await new Promise((resolve) => {
			guild.fetchInvites().then((invites) => {
				for (const invite of invites) {
					if (code === invite[0]) {
						resolve(true);
						return;
					}
				}
				resolve(false);
			});
		});
	};
	const code = message.content.split('discord.gg/')[1];

	if (message.content.includes('discord.gg/')) {
		const isOurInvite = await isInvite(message.guild, code);
		console.log(isOurInvite);
		if (!isOurInvite) {
			message.reply('La pub est interdite');
			message.delete();
		}
	}
  // Vérification Prefix //

	const guildPrefixes = ".";

  //await mongo().then(async (mongoose) => {
                //try {
					//const result = await commandPrefixSchema.findOne({ _id: message.guild.id })
					// message.guild.channels.cache[message.guild.id] = guildPrefixes = result.prefix || "."
                //} finally {
 //                   mongoose.connection.close()
//             }
  //          })

  
	if (!message.content.startsWith(guildPrefixes) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Trouve le fichier .js pour la commande //
	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command)
		return message.channel.send(
			"Cette commande n'existe pas. Tapez ${Prefix}help pour avoir la liste des commandes."
		);

	// Vérifie que la commande peut être exécuter dans les dm //
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply("I can't execute that command inside DMs!");
	}

	if (command.creator && message.author.id === 404585725565337610)
		return message.channel.send('Cette commande ne peut être effectuer que par pfevrety#1908');

	// Vérifie que la commande ne néscéssite pas de Permissions //
	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply("Tu n'as pas la permission pour éxécuter cette commande !");
		}
	}

	// Manque arguments //
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	// Gère un cooldowns //
	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.log(chalk.red(error));
		message.reply('there was an error trying to execute that command!');
	}
});


module.exports.updateCache = (guildId, newPrefix) => {
  guildPrefixes[guildId] = newPrefix;
};

// Se connecte à l'api //
client.login(Token);
