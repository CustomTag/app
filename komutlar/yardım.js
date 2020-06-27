const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	//kendi URL'lerini eklersn :D
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor("Discord bot list Page", client.user.avatarURL)
  .addField("Website Creator","Discords bot list, Created by CustomTag#0001")
	.addField("Add a bot?","[Click here](https://www.discords-bot-list.cf/botekle)")
  .addField("Hosted by","[Glitch](https://glitch.com)")
  .addField("Website","[Click here](https://www.discords-bot-list.cf)")
  .addField("Search Bot","?search (botid)")
  message.channel.send({embed: embed})
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['y', 'help', 'h', 'bilgi', 'info'],
	permLevel: 0,
	kategori: 'general'
}

exports.help = {
	name: 'help',
	description: 'Shows information about the system!',
	usage: 'help'
}