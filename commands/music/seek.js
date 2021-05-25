module.exports = {
    name: 'seek',
    usage: '[time: number]',
    async execute(message, args, distube) {
        distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("Invalid song number."));
    },
};