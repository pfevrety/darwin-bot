const chalk = require("chalk");
const mongo = require('../mongo');
const commandPrefixSchema = require('../schemas/command-prefix-schema');
const guildPrefixes = {};
const globalPrefix = ".";


module.exports = (message, client, Discord) => {

    const prefix = guildPrefixes[message.guild.id] || globalPrefix

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Trouve le fichier .js pour la commande //
    const command =
        client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command)
        return message.channel.send(
            `Cette commande n'existe pas. Tapez ${prefix} help pour avoir la liste des commandes.`
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
}

module.exports.updateCache = (guildId, newPrefix) => {
    guildPrefixes[guildId] = newPrefix
}

module.exports.loadPrefixes = async (message, client) => {
    await mongo().then(async (mongoose) => {
        try {
            for (const guild of client.guilds.cache) {
                const guildId = message.guild.id

                const result = await commandPrefixSchema.findOne({_id: guildId})
                guildPrefixes[guildId] = result.prefix;

            }
        } finally {
            await mongoose.connection.close()
        }
    })
}
