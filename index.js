const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const chalk = require('chalk');

const Token = process.env.TOKEN;

const prefix = "."

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();


// Initialisation //

console.log(chalk.blue("Lancement du programme du bot..."));

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


console.log(chalk.greenBright('Mise en cache des commandes réussie !'))

client.once('ready', () => {
	console.log(chalk.green("\nLa connection entre le bot et l'api Discord a été effectuée avec succès !"));
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    // Commande n'existe pas //

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return message.channel.send("Cette commande n'existe pas. Tapez ${Prefix}help pour avoir la liste des commandes.");

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
    };

    if (command.creator && message.author.id == '404585725565337610')

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply("Tu n'as pas la permission pour éxécuter cette commande !");
        }
    };

    // Manque arguments //
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        };

        return message.channel.send(reply)
    };

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
	    cooldowns.set(command.name, new Discord.Collection());
    };

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
	    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    };

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try {
	    command.execute(message, args);
    } catch (error) {
	    console.log(chalk.red(error));
	message.reply('there was an error trying to execute that command!');
}
});

client.login(Token);
