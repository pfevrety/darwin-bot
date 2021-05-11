const math = require('mathjs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'calc',
  args: true,
  aliases: ['calculate'],
  description: 'Eval a calc',
  cooldown: 6,
  usage: '<calc>',
  execute(message, args) {
    if (!args[0]) return message.channel.send("Merci d'entrez un calcul");
    calcul = message.content.replace('.calc').replace('undefined', '');
    let res;
    try {
      res = math.evaluate(calcul);
      color = '#1982c4';
    } catch (e) {
      res = 'Invalid calc';
      color = '#d62828';
    }
    const embed = new MessageEmbed()
      .setColor(color)
      .setAuthor('Calcul')
      .addFields(
        { name: 'Opération', value: '`' + calcul.replace(" ", "") + '`', inline: false },
        { name: 'Résultat', value: '`' + res + '`', inline: false }
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
