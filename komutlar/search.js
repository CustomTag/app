const Discord = require('discord.js');
const db = require('quick.db')
const request = require('request')

exports.run = async (client, msg, args) => {
    let prefix = await db.fetch(`${msg.guild.id}.prefix`) || client.settings.prefix
    if(!args[0]) {
      return msg.channel.send(new Discord.RichEmbed().setDescription('Please enter a bot ID!').setColor("RANDOM"))
    }
    request(`https://www.discords-bot-list.cf/api/bots/${args[0]}`, function (error, response, body) {
    if (error) return msg.channel.send('Error:', error);
    else if (!error) {
      var a = JSON.parse(body).name
      var b = JSON.parse(body).id
      var c = `${JSON.parse(body).avatar}`
      var d = JSON.parse(body).prefix
      var e = JSON.parse(body).library
      var f = `${JSON.parse(body).owner} (${JSON.parse(body).ownerid})`
      var g = JSON.parse(body).short_description
      var h = JSON.parse(body).labels
      if(JSON.parse(body).support_server === 'Unspecified') {
        var i = 'Unspecified'
      } else {
        var i = `[${a} Support Server](${JSON.parse(body).support_server})`
      }
      if(JSON.parse(body).website === 'Unspecified') {
        var j = 'Unspecified'
      } else {
      var j = JSON.parse(body).website
      }
      if(JSON.parse(body).github === 'Unspecified')  {
        var k = 'Unspecified'
      } else {
        var k = `[Github](${JSON.parse(body).github})`
      }
      var l = JSON.parse(body).certificate
      var m = JSON.parse(body).status
      var n = JSON.parse(body).number_of_votes
    }
      
      request(`https://www.discords-bot-list.cf/api/tumbots`, function (error, response, body) {
    if (error) return msg.channel.send('Error:', error);
    else if (!error) {
    if (body.includes(args[0])=== false) return msg.reply("There is no bot in this ID system!")
    }
       })
      
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(c)
    .setTitle(`Discord4Bots - Bot Search`)
    .setDescription(`${a} (${b}) [${n} votes]`, c)
    .addField('Prefix', d)
    .addField('Owner', f)
    .addField('Short Description', g)
    .addField('labels', h)
    .addField('Certificate', l)
    .addField('Approval Status', m)
    .addField("Website", j)
    .addField('Github', k)
    .addField('Support Server', i)
    .setFooter('https://www.discords-bot-list.cf/ is looking for bots in the system!')
    msg.channel.send({embed})
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['search-bot', 'find-bot', 'search'],
  permLevel: 0,
  kategori: 'general'
};

exports.help = {
  name: 'search',
  description: 'Allows you to search for bots in the Discord Bots system!',
  usage: 'search [bot id]'
};