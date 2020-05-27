const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	//kendi URL'lerini eklersn :D
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor("Discord Bot List", client.user.avatarURL)
  .addField("What is the purpose of the system? What does the system do? "," You can see the required information [by clicking here](https://www.discords-bot-list.cf/hakkimizda).")
	.addField("How do I add a bot? "," [Click here](https://www.discords-bot-list.cf/botekle) You can teleport to the place where you can add a bot.")
  .addField("Where can I see all the bots in the system? "," [Click here](https://www.discords-bot-list.cf/botlar) You can see.")
  .addField("What does the certificate do? How to get it? "," [Click here](https://www.discords-bot-list.cf/sertifika) You can see.")
  .addField("What can be done in the user panel? "," In the user panel, you can edit the profile / application of your bots in the system and delete your bots from the system. \ n [Click here to go to the user panel.](https://www.discords-bot-list.cf/panel)")
  message.channel.send({embed: embed})
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['y', 'help', 'h', 'bilgi', 'info'],
	permLevel: 0,
	kategori: 'testing-1'
}

exports.help = {
	name: 'help',
	description: 'Shows information about the system.',
	usage: 'help'
}