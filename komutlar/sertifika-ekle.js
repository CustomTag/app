const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
	if(!args[0]) {
		const embed = new Discord.RichEmbed()
			.setDescription(`You must write an ID!`)
			.setColor(client.ayarlar.renk)
		message.channel.send({embed})
		return
	}
  
  if(!client.users.has(args[0])) {
		const embed = new Discord.RichEmbed()
			.setDescription(`Invalid ID!`)
			.setColor(client.ayarlar.renk)
		message.channel.send({embed})
		return
	}
  
  if(!client.users.get(args[0]).bot) {
		const embed = new Discord.RichEmbed()
			.setDescription(`My dear, this person is not a boat, what's the head ?!`)
			.setColor(client.ayarlar.renk)
		message.channel.send({embed})
		return
	}
  
	if (db.has('botlar')) {
			if (Object.keys(db.fetch('botlar')).includes(args[0]) === false)  return message.reply("My dear, my dear, the bot that wrote the ID is missing in the system!")
	}
  
  if (db.has('botlar')) {
  if (db.has(`botlar.${args[0]}.certificate`) === true) return message.reply("Dear, there are already Certified bots with this ID.")
  }
  
  message.channel.send(`Successfully \`${args[0]}\` ID bot is Certified!`)
  client.channels.get(client.ayarlar.kayıt).send(`A Administrator Named: \`${message.author.tag}\` With Bot Owner: \`${db.fetch(`botlar.${args[0]}.owner`)}\` With BotID \`${args[0]}\` Just Added Bot: \`${db.fetch(`botlar.${args[0]}.name`)}\` Just Approved The Bot To Be Certificates!:Certificate_Icon:`)
	
  db.set(`botlar.${args[0]}.certificate`, "Bulunuyor")
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 'special',
	kategori: 'authorized'
}

exports.help = {
	name: 'Add-certificate',
	description: 'Makes the bot in the written ID certified.',
	usage: 'Add-certificate [ID]'
}