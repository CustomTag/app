const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
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
			.setDescription(`My dear, this person is not a boat, what's the head?!`)
			.setColor(client.settings.color)
		message.channel.send({embed})
		return
	}
  
	if (db.has('bots')) {
			if (Object.keys(db.fetch('bots')).includes(args[0]) === false)  return message.reply("My dear, the bot that wrote the ID is missing in the system!")
	}
  
  if (db.has('bots')) {
  if (db.has(`bots.${args[0]}.certificate`) === true) return message.reply("Dear, there are already Certified bots with this ID.")
  }
  
  message.channel.send(`Successfully Added BotID: \`${args[0]}\` To Certificate System List!`)
  client.channels.get(client.settings.kayıt).send(`Admin: \`${message.author.tag}\` Just Added Bot: \`${db.fetch(`bots.${args[0]}.name`)}\` To Certificate System List https://www.discords-bot-list.cf/bot/${db.fetch(`bots.${args[0]}}.id`)}`)
	
  db.set(`bots.${args[0]}.certificate`, "Bulunuyor")
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 'special',
	kategori: 'authorized'
}

exports.help = {
	name: 'certificate',
	description: 'Makes the bot in the written ID certified!',
	usage: 'certificate [ID]'
}