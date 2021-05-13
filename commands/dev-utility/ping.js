module.exports = {
    name: 'ping',
    aliases: ['latence'],
    description: 'Get the ping of the bot',
    execute(message, args) {
        message.channel.send(`***Calcul du ping...***\n👷 Ping du bot: \`\`${Math.abs(Date.now() - message.createdTimestamp)}\`\`. \n⚙ Ping lantence de l'API discord: \`\`${message.client.ws.ping}\`\`.`)
    },
};