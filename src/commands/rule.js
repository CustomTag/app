const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
  const embed = new MessageEmbed()
  .setTItle('DIscord Town | Rules')
  message.channel.send('TESTING!');
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "rule",
  description: "RULES!",
  usage: ""
};