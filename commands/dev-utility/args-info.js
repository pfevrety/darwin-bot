module.exports = {
    name: 'args-info',
    args: true,
    aliases: ['args'],
    description: 'Information about the arguments provided.',
    cooldown: 1,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		} else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};
