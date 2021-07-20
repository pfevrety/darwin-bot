const language = require("../../middleware/language");

module.exports = {
  name: "clear",
  description: "Clear old message",
  aliases: ["purge"],
  usage: "<user> <message-count>",
  permissions: ["MANAGE_MESSAGES"],
  cooldown: 5,
  args: true,
  owner: false,
  guildOnly: true,
  async execute(message, args) {
    const member =
      message.mentions.members.first() ||
      getMemberFromMention(message, args[0]) ||
      message.guild.members.cache.get(args[0]);

    const amount = parseInt(args[0]);

    await message.delete();

    if (member) {
      messages = (await channel.messages.fetch({ limit: amount })).filter(
        (m) => m.member.id === member.id
      );
    } else {
      messages = amount;
    }

    channel.bulkDelete(messages, true)
      .then((msg) => {
        message.channel.send(language(message.guild, "CLEAR_SUCCEED").replace('{msg}', message.size));
      })
      .catch((err) => {
        message.channel.send(err);
      });
  },
};
