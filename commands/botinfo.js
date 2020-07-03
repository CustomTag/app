const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args, msg) => {
	if(!args[0]) {
		const embed = new Discord.RichEmbed()
			.setDescription(`You must write an ID!`)
			.setColor(client.settings.color)
		message.channel.send({embed})
		return
	}
  
  if(!client.users.has(args[0])) {
		const embed = new Discord.RichEmbed()
			.setDescription(`Invalid ID!`)
			.setColor(client.settings.color)
		message.channel.send({embed})
		return
	}
  
  if(!client.users.get(args[0]).bot) {
		const embed = new Discord.RichEmbed()
			.setDescription(`Sorry, this person is not a bot, what the head?!`)
			.setColor(client.settings.color)
		message.channel.send({embed})
		return
	}
  
	if (db.has('bots')) {
			if (Object.keys(db.fetch('bots')).includes(args[0]) === false)  return message.reply("Sorry, the bot that wrote the ID is missing in the system!")
	} else {
    return message.reply("No bots are in the system!")
  }
  
  const embed = new Discord.RichEmbed()
  embed.setTitle("Bot Info")
  embed.addFields(
      {name: "Bot Name", value:db.fetch(`bots.${args[0]}.name`)},
      {name: }
  )
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 'special',
	kategori: 'authorized'
}

exports.help = {
	name: 'botinfo',
	description: 'Get info for a bot!',
	usage: 'botinfo [ID]'
}