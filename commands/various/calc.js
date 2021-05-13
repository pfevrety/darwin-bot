const math = require('mathjs');
const { MessageEmbed } = require('discord.js');
 const language = require('../../middleware/language')

module.exports = {
  name: 'calc',
  args: true,
  aliases: ['calculate'],
  description: 'Eval a calc',
  cooldown: 6,
  usage: '<calc>',
  execute(message, args) {
    const { guild } = message;

    if (!args[0]) return message.channel.send(`${language(guild, 'CALCUL_ERROR')}`);
    const calcul = args.join("")
    let color;
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
        { name: `${language(guild, 'CALCUL_OPERATION')}`, value: '`' + calcul.replace(" ", "") + '`', inline: false },
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
