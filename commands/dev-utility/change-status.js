const fs = require('fs');

module.exports = {
	name: 'change-status',
	description: 'Change the status of the bot',
    args: true,
    creator: true,
	execute(message, args) {
        const content = args.toString();
        message.client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            }
        })
	},
};