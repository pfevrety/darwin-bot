
module.exports = {
	name: 'eval',
	description: 'eval a javascript iteration',
    args: true,
    usage: '<evalutaion>',
    creator: true,
    cooldown: 0,
    execute(message, args) {
	        console.log(eval(args.join(" ")))
	    },
};