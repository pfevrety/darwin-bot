
module.exports = {
	name: 'change-status',
	description: 'Change the status of the bot',
    args: true,
    usage: 'welcome message',
    creator: true,
    cooldown: 0,
    execute(message, args) {
	        eval(args.join(" "))
	    },
};