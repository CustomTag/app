const Discord = require('discord.js');
const db = require('quick.db')
const request = require('request')

exports.run = async (client, message, args, msg) => {
  let prefix = await db.fetch(`${msg.guild.id}.prefix`) || client.settings.prefix
	// add your own URLs: D
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor("Discord4Bots - information", client.user.avatarURL)
  .addField("Website Creator","CustomTag#0001")
	.addField("Add a bot?","[Click here](https://www.discords-bot-list.cf/addbot/)")
  .addField("Hosted by","[Glitch](https://glitch.com)")
  .addField("Website","[Click here](https://www.discords-bot-list.cf/)")
  .addField("Search Bot","c!search (botid)")
  .addField("Help Cmds","c!help")
  message.channel.send({embed: embed})
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['y', 'help', 'h', 'information', 'info'],
	permLevel: 0,
	kategori: 'general'
}

exports.help = {
	name: 'help',
	description: 'Shows information about the system!',
	usage: 'help'
}