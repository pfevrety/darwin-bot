module.exports = {
	name: 'ping',
	description: 'Ping of the bot',
	execute(message, args) {
        message.channel.send('***Calcul du ping...***').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;
            message.channel.send("👷 Ping du bot: `" + ping  + "`.")
            message.channel.send("⚙️ La lantence de l'API discord: `" + message.client.ws.ping + "`")
        });
	},
};