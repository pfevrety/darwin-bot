module.exports = {
    name: 'website',
    args: false,
    aliases: ['creator'],
    description: 'Information about the creator website.',
    cooldown: 5,
	execute(message, args) {
        message.channel.send("https://eiio.dev");
    }
};
