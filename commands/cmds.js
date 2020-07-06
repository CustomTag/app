const Discord = require('discord.js');
const db = require('quick.db')
const fs = require('fs')

exports.run = async (client, message, args, msg) => {
  console.log(__dirname)
  let prefix = await db.fetch(`${client.settings.prefix}`)
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor("Discord4Bots - Commands", client.user.avatarURL)
  .setDescription("Here are all the commands you can use with Ceaxry.")
  .addField("${prefix}help", "See the help menu!")
  
  message.channel.send({embed: embed})
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['cmds', 'commands', 'command'],
	permLevel: 0,
	kategori: 'general'
}

exports.help = {
	name: 'cmds',
	description: 'All commands!',
	usage: 'cmds'
}