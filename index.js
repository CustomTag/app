const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const useful = require('useful-tools');
client.ayar = db;

client.htmll = require('cheerio');
client.useful = useful;
client.tags = require('html-tags');

let profil = JSON.parse(fs.readFileSync('./profil.json', 'utf8'))
client.profil = profil

client.ayarlar = {
  "prefix": "?", //prefix
  "oauthSecret": "Vprtv_bdgk3-jKeY_5-8UfsO60S7gKxm", // bot secreti
	"callbackURL": "https://www.discords-bot-list.cf/callback", // change the urls of my site with "/ callback"!
	"kayıt": "714504216370085929", // approved, rejected, you have applied, you will write the ID of the channel where the recordings will go
  "color": "RANDOM" // get the color of the embeds from here, something like that
};

client.yetkililer = ["484010160981934100", "343793233815535626", "676710146277113877", "434721364507885568"]// ids of all authorities gelece array // ids of all authorities gelcek array
client.webyetkililer = ["484010160981934100", "343793233815535626", "676710146277113877", "434721364507885568"]// ids of web officials future array
client.sunucuyetkililer = ["484010160981934100", "343793233815535626", "676710146277113877", "434721364507885568"]// ids of server authorities future array

//["id", "id2"]

client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  
   require("./app.js")(client);
  
  client.user.setActivity(`${client.ayarlar.prefix}help`, { type:"PLAYING" })
  
  console.log("Active!")
});

setInterval(() => {

	if (db.has('botlar') && db.has('kbotlar')) {

for (var i = 0; i < Object.keys(db.fetch('kbotlar')).length; i++) {
for (var x = 0; x < Object.keys(db.fetch('botlar')).length; x++) {
var bot = Object.keys(db.fetch('botlar'))[x]
var user = Object.keys(db.fetch('kbotlar'))[i]
if (db.has(`votes.${bot}.${user}`)) {
   setTimeout(() => {
        db.delete(`votes.${bot}.${user}`)
    }, require('ms')(`${client.useful.seg(db.fetch(`votes.${bot}.${user}`), 6)}h`));
}
}
}

	}

}, 10000);

const chalk = require('chalk')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir(`./komutlar/`, (err, files) => {
	let jsfiles = files.filter(f => f.split(".").pop() === "js")

	if(jsfiles.length <= 0) {
		console.log("Discord Bots! I couldn't find any scripts!")
	} else {
		if (err) {
			console.error("Error! There is no name or aliases part of a command!")
		}
		console.log(`${jsfiles.length} command will be loaded`)

		jsfiles.forEach(f => {
			let props = require(`./komutlar/${f}`)
			client.commands.set(props.help.name, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name)
			})
			console.log(`Installed command: ${props.help.name}`)
		})
	}
});

client.on("message", async message => {

	if (message.author.bot) return
	if (!message.content.startsWith('?')) return
	var command = message.content.split(' ')[0].slice('?'.length)
	var args = message.content.split(' ').slice(1)
	var cmd = ''

	if (client.commands.has(command)) {
		var cmd = client.commands.get(command)
	} else if (client.aliases.has(command)) {
		var cmd = client.commands.get(client.aliases.get(command))
	}

	if (cmd) {
    if (cmd.conf.permLevel === 'special') { // you can use that command just by web officials
      if (client.yetkililer.includes(message.author.id) === false) {
        const embed = new Discord.RichEmbed()
					.setDescription(`My brother, you are not a WebSite officer. Do not deal with silly things!`)
					.setColor(client.ayarlar.color)
					.setTimestamp()
				message.channel.send("Insufficient Authority.")
				return
      }
    }
    
		if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`You learn to manage messages first and then use this command.`)
					.setColor(client.ayarlar.color)
					.setTimestamp()
				message.channel.send("Insufficient authority.")
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`You are not competent to discard members.`)
					.setColor(client.ayarlar.color)
					.setTimestamp()
				message.channel.send("You are not competent to discard members.")
				return
			}
		}
		if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Insufficient authority.`)
					.setColor(client.ayarlar.color)
					.setTimestamp()
				message.channel.send("Insufficient authority.")
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			const x = await client.fetchApplication()
      var arr = [x.owner.id, '484010160981934100']
			if (!arr.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Your competence is insufficient.`)
					.setColor(client.ayarlar.color)
					.setTimestamp()
				message.channel.send("Insufficient authority.")
				return
			}
		}
		if (cmd.conf.enabled === false) {
			const embed = new Discord.RichEmbed()
				.setDescription(`This command is disabled.`)
				.setColor(client.ayarlar.color)
				.setTimestamp()
			message.channel.send("This command is disabled.")
			return
		}
		if(message.channel.type === "dm") {
			if (cmd.conf.guildOnly === true) {
				const embed = new Discord.RichEmbed()
					.setDescription(`You cannot use this command in private messages.`)
					.setColor(client.ayarlar.color)
					.setTimestamp()
				message.channel.send("You cannot use this command in private messages.")
				return
			}
		}
		cmd.run(client, message, args)
	}
});

client.login("NzEzNzM2Njk0ODU1MTA2NTYw.Xs0h4w.gZdpBMXPHUAdksjiYmZ2SjpAU2w") // write your token here

process.env = {}
process.env.TOKEN = "NzEzNzM2Njk0ODU1MTA2NTYw.Xs0h4w.gZdpBMXPHUAdksjiYmZ2SjpAU2w";