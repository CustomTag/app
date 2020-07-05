const Discord = require('discord.js');
const db = require('quick.db')
const request = require('request')

exports.run = async (client, msg, args) => {
    let prefix = await db.fetch(`${msg.guild.id}.prefix`) || client.ayarlar.prefix
    if(!args[0]) {
      return msg.channel.send(new Discord.RichEmbed().setDescription('Lütfen Bir Bot ID\'i Giriniz!').setColor("RANDOM"))
    }
    request(`https://turkbotlar.glitch.me/api/botlar/${args[0]}`, function (error, response, body) {
    if (error) return msg.channel.send('Hata:', error);
    else if (!error) {
      var a = JSON.parse(body).isim
      var b = JSON.parse(body).id
      var c = `${JSON.parse(body).avatar}`
      var d = JSON.parse(body).prefix
      var e = JSON.parse(body).kütüphane
      var f = `${JSON.parse(body).sahip} (${JSON.parse(body).sahipid})`
      var g = JSON.parse(body).kisa_aciklama
      var h = JSON.parse(body).etiketler
      if(JSON.parse(body).destek_sunucusu === 'Belirtilmemiş') {
        var i = 'Belirtilmemiş'
      } else {
        var i = `[${a} Destek Sunucusu](${JSON.parse(body).destek_sunucusu})`
      }
      if(JSON.parse(body).web_sitesi === 'Belirtilmemiş') {
        var j = 'Belirtilmemiş'
      } else {
      var j = JSON.parse(body).web_sitesi
      }
      if(JSON.parse(body).github === 'Belirtilmemiş')  {
        var k = 'Belirtilmemiş'
      } else {
        var k = `[Github](${JSON.parse(body).github})`
      }
      var l = JSON.parse(body).sertifika
      var m = JSON.parse(body).durum
      var n = JSON.parse(body).oy_sayisi
    }
      
      request(`https://fiboxbotlist.glitch.me/api/tumbotlar`, function (errorr, responsee, bodyy) {
    if (errorr) return msg.channel.send('Hata:', errorr);
    else if (!errorr) {
    if (bodyy.includes(args[0])=== false) return msg.reply("Bu ID'de Bir Bot Sistemde Bulunmamaktadır!")
    }
       })
      
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(c)
    .setTitle(`Discord4Bots - `)
    .setDescription(`${a} (${b}) [${n} oy]`, c)
    .addField('Prefix', d)
    .addField('Owner', f)
    .addField('Short Description', g)
    .addField('labelslabels', h)
    .addField('Certificate', l)
    .addField('Status', m)
    .addField("Website", j)
    .addField('Github', k)
    .addField('Support Server', i)
    .setFooter('Searching for Bot in https://discord4bots.glitch.me/ System.')
    msg.channel.send({embed})
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bot', 'search', 'find'],
  permLevel: 0,
  kategori: 'general'
};

exports.help = {
  name: 'botinfo',
  description: 'Lets You Search For Bots In The Discord4Bots System.',
  usage: 'botinfo [ID]'
};