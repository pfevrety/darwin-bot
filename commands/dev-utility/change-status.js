const fs = require('fs');

module.exports = {
	name: 'change-status',
	description: 'Change the status of the bot',
    args: true,
    usage: 'welcome message',
    creator: true,
    cooldown: 0,
    execute(message, args) {
        const content = message.content.substr(message.content.indexOf(" ") + 1);
        console.log(content)
        console.log(content)
        message.client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            }
        })
	},
};