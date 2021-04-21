const math = require('mathjs');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'calc',
    args: true,
    aliases: ['calculate'],
    description: 'Eval a calc',
    cooldown: 6,
    usage: '<calc>',
	execute(message, args) {
if(!args[0]) return message.channel.send("Merci d'entrez un calcul");
    calcul = message.content.replace('.calc').replace('undefined', '')
    let res;
    try {
        res = math.evaluate(calcul)
    } catch(e) {
        return message.channel.send('Please enter a valid calc')
    }
    const embed = new MessageEmbed()
        .setColor('#fff')
        .setAuthor("Calcul")
        .addFields(
            { name: 'Opération', value: "`"+calcul+"`", inline: false },
            { name: 'Résultat', value: "`"+res+"`", inline: false }
        )
        .setFooter("Darwin bot - pfevrety#1908", "https://cdn.discordapp.com/avatars/761598393004458004/75fe91fe52dc120114a449ff48571764.png?size=256")
    message.channel.send(embed);    }
};
