const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
	if(!args[0]) {
		const embed = new Discord.RichEmbed()
			.setDescription(`Bir ID yazmalısın!`)
			.setColor(client.ayarlar.renk)
		message.channel.send({embed})
		return
	}
  
  if(!client.users.has(args[0])) {
		const embed = new Discord.RichEmbed()
			.setDescription(`Geçersiz ID!`)
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
  if (db.has(`botlar.${args[0]}.sertifika`) === true) return message.reply("Dear, there are already Certified bots with this ID.")
  }
  
  message.channel.send(`Successfully \`${args[0]}\` ID bot is Certified!`)
  client.channels.get(client.ayarlar.kayıt).send(`\`${message.author.tag}\` adlı yetkili tarafından \`${db.fetch(`botlar.${args[0]}.sahip`)}\` adlı kullanıcının \`${args[0]}\` ID'ine sahip \`${db.fetch(`botlar.${args[0]}.isim`)}\` adlı botuna sertifika verildi!`)
	
  db.set(`botlar.${args[0]}.sertifika`, "Bulunuyor")
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 'ozel',
	kategori: 'yetkili'
}

exports.help = {
	name: 'sertifika-ekle',
	description: 'Yazılan ID\'deki botu sertifikalı yapar.',
	usage: 'sertifika-ekle [ID]'
}