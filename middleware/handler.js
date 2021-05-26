const chalk = require("chalk");
const mongo = require('../mongo');
const commandPrefixSchema = require('../schemas/command-prefix-schema');
const guildPrefixes = {};
const globalPrefix = ".";
const language = require('../middleware/language')


module.exports = (message, client, Discord, prefix, distube) => {

    //const prefix = guildPrefixes[message.guild.id] || globalPrefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Trouve le fichier .js pour la commande //
    const command =
        client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command)
        return message.channel.send(
            `${language(message.guild, 'HANDLER_COMMAND_DOES_NOT_EXIST').replace("{prefix}", prefix)}`
        );

    // Vérifie que la commande peut être exécuter dans les dm //
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply(language(message.guild, 'HANDLER_COMMAND_NOT_IN_DM'));
    }

    if (command.creator && message.author.id === 404585725565337610)
        return message.channel.send('Cette commande ne peut être effectuer que par pfevrety#1908');

    // Vérifie que la commande ne néscéssite pas de Permissions //
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply(language(message.guild, 'HANDLER_PERMISSION_DENIED'));
        }
    }

    // Manque arguments //
    if (command.args && !args.length) {
        let reply = language(message.guild, 'HANDLER_LACK_OF_ARGUMENT_PART1');
        if (command.usage) {
            reply += `${language(message.guild, 'HANDLER_LACK_OF_ARGUMENT_PART2')} \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.reply(reply);
    }

    // Gère un cooldowns //
    const {cooldowns} = client;

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
            return message.reply(language(message.guild, 'HANDLER_UNFINISHED_COOLDOWN').replace("{command}", command.name).replace("{time}", timeLeft.toFixed(1)));
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, distube);
    } catch (error) {
        console.log(chalk.red(error));
        message.reply(language(message.guild, 'HANDLER_RUNTIME_ERROR'));
    }
}