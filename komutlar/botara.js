const Discord = require('discord.js');
const db = require('quick.db')
const request = require('request')

exports.run = async (client, msg, args) => {
    let prefix = await db.fetch(`${msg.guild.id}.prefix`) || client.ayarlar.prefix
    if(!args[0]) {
      return msg.channel.send(new Discord.RichEmbed().setDescription('Please enter a bot ID!').setColor("RANDOM"))
    }
    request(`https://fiboxbotlist.glitch.me/api/botlar/${args[0]}`, function (error, response, body) {
    if (error) return msg.channel.send('Hata:', error);
    else if (!error) {
      var a = JSON.parse(body).name
      var b = JSON.parse(body).id
      var c = `${JSON.parse(body).avatar}`
      var d = JSON.parse(body).prefix
      var e = JSON.parse(body).library
      var f = `${JSON.parse(body).owner} (${JSON.parse(body).ownerid})`
      var g = JSON.parse(body).kisa_aciklama
      var h = JSON.parse(body).etiketler
      if(JSON.parse(body).destek_sunucusu === 'Unspecified') {
        var i = 'Unspecified'
      } else {
        var i = `[${a} Destek Sunucusu](${JSON.parse(body).destek_sunucusu})`
      }
      if(JSON.parse(body).web_sitesi === 'Unspecified') {
        var j = 'Unspecified'
      } else {
      var j = JSON.parse(body).web_sitesi
      }
      if(JSON.parse(body).github === 'Unspecified')  {
        var k = 'Unspecified'
      } else {
        var k = `[Github](${JSON.parse(body).github})`
      }
      var l = JSON.parse(body).certificate
      var m = JSON.parse(body).status
      var n = JSON.parse(body).vote_sayisi
    }
      
      request(`https://fiboxbotlist.glitch.me/api/tumbotlar`, function (errorr, responsee, bodyy) {
    if (errorr) return msg.channel.send('Hata:', errorr);
    else if (!errorr) {
    if (bodyy.includes(args[0])=== false) return msg.reply("There is no bot in this ID system!")
    }
       })
      
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(c)
    .setTitle(`Discord Bots - Bot Search`)
    .setDescription(`${a} (${b}) [${n} oy]`, c)
    .addField('Prefix', d)
    .addField('Owner', f)
    .addField('Short Description', g)
    .addField('labels', h)
    .addField('Certificate', l)
    .addField('Approval Status', m)
    .addField("Website", j)
    .addField('Github', k)
    .addField('Support Server', i)
    .setFooter('https://www.discords-bot-list.cf/ is looking for bots in the system.')
    msg.channel.send({embed})
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['search-bot', 'find-bot', 'botara'],
  permLevel: 0,
  kategori: 'genel'
};

exports.help = {
  name: 'search',
  description: 'Allows you to search for bots in the Discord Bots system.',
  usage: 'search [bot id]'
};