const request = require('request');
const db = require('quick.db');
const fs = require('fs');

const url = require("url");
const path = require("path");

const Discord = require("discord.js");

var express = require('express');
var app = express();
const moment = require("moment");
require("moment-duration-format");

const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;

const helmet = require("helmet");

const md = require("marked");

module.exports = (client) => {

const templateDir = path.resolve(`${process.cwd()}${path.sep}html`);

app.use("/css", express.static(path.resolve(`${templateDir}${path.sep}css`)));

passport.serializeUser((user, done) => {
done(null, user);
});
passport.deserializeUser((obj, done) => {
done(null, obj);
});

passport.use(new Strategy({
clientID: client.user.id,
clientSecret: client.ayarlar.oauthSecret,
callbackURL: client.ayarlar.callbackURL,
scope: ["identify"]
},
(accessToken, refreshToken, profile, done) => {
process.nextTick(() => done(null, profile));
}));

app.use(session({
secret: '123',
resave: false,
saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

app.locals.domain = process.env.PROJECT_DOMAIN;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
extended: true
})); 

function checkAuth(req, res, next) {
if (req.isAuthenticated()) return next();
req.session.backURL = req.url;
res.redirect("/giris");
}

const renderTemplate = (res, req, template, data = {}) => {
const baseData = {
bot: client,
path: req.path,
user: req.isAuthenticated() ? req.user : null
};
res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};

app.get("/giris", (req, res, next) => {
if (req.session.backURL) {
req.session.backURL = req.session.backURL;
} else if (req.headers.referer) {
const parsed = url.parse(req.headers.referer);
if (parsed.hostname === app.locals.domain) {
req.session.backURL = parsed.path;
}
} else {
req.session.backURL = "/";
}
next();
},
passport.authenticate("discord"));

app.get("/baglanti-hatası", (req, res) => {
renderTemplate(res, req, "autherror.ejs");
});

app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), async (req, res) => {
if (req.session.backURL) {
const url = req.session.backURL;
req.session.backURL = null;
res.redirect(url);
} else {
res.redirect("/");
}
});

app.get("/cikis", function(req, res) {
req.session.destroy(() => {
req.logout();
res.redirect("/");
});
});

app.get("/", (req, res) => {
renderTemplate(res, req, "index.ejs");
});
  
  app.get("/alim", (req, res) => { renderTemplate (res, req, "alim.ejs") });

app.get("/sertifika", (req, res) => {

renderTemplate (res, req, "sertifika.ejs");
});

app.get("/hakkimizda", (req, res) => {
  
renderTemplate(res, req, "hakkımızda.ejs");
});

app.get("/botlar", (req, res) => {
 
renderTemplate(res, req, "botlar.ejs")
});

app.get("/botyonetim/hata", (req, res) => {
  
renderTemplate(res, req, "hataa.ejs")
});

app.get("/botekle/hata", (req, res) => {
 
renderTemplate(res, req, "hataaa.ejs")
});

app.get("/botekle", checkAuth, (req, res) => {
 
renderTemplate(res, req, "botekle.ejs")
});

app.post("/botekle", checkAuth, (req, res) => {

let ayar = req.body

if (ayar === {} || !ayar['botid'] || !ayar['prefix'] || !ayar['library'] || !ayar['kisa-aciklama'] || !ayar['uzun-aciklama'] || !ayar['etikett']) return res.redirect('/botyonetim/hata')

let ID = ayar['botid']

if (db.has('botlar')) {
    if (Object.keys(db.fetch('botlar')).includes(ID) === true) return res.redirect('/botekle/hata')
}
  
  var tag = ''
  if (Array.isArray(ayar['etikett']) === true) {
    var tag = ayar['etikett']
  } else {
    var tag = new Array(ayar['etikett'])
  }

request({
url: `https://discordapp.com/api/v7/users/${ID}`,
headers: {
"Authorization": `Bot ${process.env.TOKEN}`
},
}, function(error, response, body) {
if (error) return console.log(error)
else if (!error) {
var sistem = JSON.parse(body)

db.set(`botlar.${ID}.id`, sistem.id)
db.set(`botlar.${ID}.name`, sistem.username+"#"+sistem.discriminator)

db.set(`botlar.${ID}.avatar`, `https://cdn.discordapp.com/avatars/${sistem.id}/${sistem.avatar}.png`)

request({
url: `https://discordapp.com/api/v7/users/${req.user.id}`,
headers: {
"Authorization": `Bot ${process.env.TOKEN}`
},
}, function(error, response, body) {
if (error) return console.log(error)
else if (!error) {
var owner = JSON.parse(body)

db.set(`botlar.${ID}.prefix`, ayar['prefix'])
db.set(`botlar.${ID}.library`, ayar['library'])
db.set(`botlar.${ID}.owner`, owner.username+"#"+owner.discriminator)
db.set(`botlar.${ID}.ownerid`, owner.id)
db.set(`botlar.${ID}.ShortDesc`, ayar['kisa-aciklama'])
db.set(`botlar.${ID}.uzunaciklama`, ayar['uzun-aciklama'])
db.set(`botlar.${ID}.tag`, tag)
if (ayar['botsite']) {
db.set(`botlar.${ID}.site`, ayar['botsite'])
}
if (ayar['github']) {
db.set(`botlar.${ID}.github`, ayar['github'])
}
if (ayar['botdestek']) {
db.set(`botlar.${ID}.destek`, ayar['botdestek'])
}

db.set(`kbotlar.${req.user.id}.${ID}`, db.fetch(`botlar.${ID}`))

res.redirect("/kullanici/"+req.params.userID+"/panel");

client.channels.get(client.ayarlar.kayıt).send(`\`${req.user.username}#${req.user.discriminator}\` Just Added Bot: \`${sistem.username}#${sistem.discriminator}\` To Pending List`)

if (client.users.has(db.fetch(`botlar.${ID}.ownerid`)) === true) {
client.users.get(db.fetch(`botlar.${ID}.ownerid`)).send(`Your Bot: \`${db.fetch(`botlar.${ID}.name`)}\` Has Been Added To The Pending List`)
}

}})
}})

});

app.get("/kullanicilar", (req, res) => {
  renderTemplate(res, req, "kullanicilar.ejs")
});

app.get("/kullanici/:userID", (req, res) => {

  request({
    url: `https://discordapp.com/api/v7/users/${req.params.userID}`,
    headers: {
      "Authorization": `Bot ${process.env.TOKEN}`
    },
  }, function(error, response, body) {
    if (error) return console.log(error)
    else if (!error) {
      var kisi = JSON.parse(body)

      renderTemplate(res, req, "kullanici.ejs", {kisi})
    };
  });

});

app.get("/kullanici/:userID/profil", (req, res) => {

  request({
    url: `https://discordapp.com/api/v7/users/${req.params.userID}`,
    headers: {
      "Authorization": `Bot ${process.env.TOKEN}`
    },
  }, function(error, response, body) {
    if (error) return console.log(error)
    else if (!error) {
      var kisi = JSON.parse(body)

      renderTemplate(res, req, "profil.ejs", {kisi})
    };
  });

});

app.get("/kullanici/:userID/profil/ayarla", checkAuth, (req, res) => {

  renderTemplate(res, req, "p-ayarla.ejs")

});

app.post("/kullanici/:userID/profil/ayarla", checkAuth, (req, res) => {

  if (req.params.userID !== req.user.id) return res.redirect('/');

  var profil = JSON.parse(fs.readFileSync('./profil.json', 'utf8'));

  var libs = ''
  if (Array.isArray(req.body['libs']) === true) {
    var libs = req.body['libs']
  } else {
    var libs = new Array(req.body['libs'])
  }

  request({
    url: `https://discordapp.com/api/v7/users/${req.params.userID}`,
    headers: {
      "Authorization": `Bot ${process.env.TOKEN}`
    },
  }, function(error, response, body) {
    if (error) return console.log(error)
    else if (!error) {
      var kisi = JSON.parse(body)

  var veri = JSON.parse(`{
  "tag": "${kisi.username}#${kisi.discriminator}",
  "name": "${req.body['name']}",
  "age": "${req.body['age']}",
  "bio": "${req.body['bio']}",
  "favlib": "${req.body['favlib']}",
  "libs": "${libs}",
  "avatar": "https://cdn.discordapp.com/avatars/${kisi.id}/${kisi.avatar}.png"
  }`)

  profil[req.user.id] = veri;

  var obj = JSON.stringify(profil)

  fs.writeFile('./profil.json', obj)

  res.redirect('/kullanici/'+req.user.id)

    }
  })

});

app.get("/kullanici/:userID/panel", checkAuth, (req, res) => {

renderTemplate(res, req, "panel.ejs")

});

app.get("/kullanici/:userID/panel/:botID/duzenle", checkAuth, (req, res) => {

var id = req.params.botID


renderTemplate(res, req, "duzenle.ejs", {id})

});


app.post("/kullanici/:userID/panel/:botID/duzenle", checkAuth, (req, res) => {

let ayar = req.body
let ID = req.params.botID
let s = req.user.id

var tag = ''
  if (Array.isArray(ayar['etikett']) === true) {
    var tag = ayar['etikett']
  } else {
    var tag = new Array(ayar['etikett'])
  }

request({
url: `https://discordapp.com/api/v7/users/${ID}`,
headers: {
"Authorization": `Bot ${process.env.TOKEN}`
},
}, function(error, response, body) {
if (error) return console.log(error)
else if (!error) {
var sistem = JSON.parse(body)

db.set(`botlar.${ID}.name`, sistem.username+"#"+sistem.discriminator)

db.set(`botlar.${ID}.avatar`, `https://cdn.discordapp.com/avatars/${sistem.id}/${sistem.avatar}.png`)

request({
url: `https://discordapp.com/api/v7/users/${req.user.id}`,
headers: {
"Authorization": `Bot ${process.env.TOKEN}`
},
}, function(error, response, body) {
if (error) return console.log(error)
else if (!error) {
var owner = JSON.parse(body)
db.set(`botlar.${ID}.prefix`, ayar['prefix'])
db.set(`botlar.${ID}.library`, ayar['library'])
db.set(`botlar.${ID}.owner`, owner.username+"#"+owner.discriminator)
db.set(`botlar.${ID}.ownerid`, owner.id)
db.set(`botlar.${ID}.ShortDesc`, ayar['kisa-aciklama'])
db.set(`botlar.${ID}.uzunaciklama`, ayar['uzun-aciklama'])
db.set(`botlar.${ID}.tag`, tag)
if (ayar['botsite']) {
db.set(`botlar.${ID}.site`, ayar['botsite'])
}
if (ayar['github']) {
db.set(`botlar.${ID}.github`, ayar['github'])
}
if (ayar['botdestek']) {
db.set(`botlar.${ID}.destek`, ayar['botdestek'])
}

res.redirect("/kullanici/"+req.params.userID+"/panel");

client.channels.get(client.ayarlar.kayıt).send(`Owner: \`${req.user.username}#${req.user.discriminator}\` Just Edited Bot: \`${sistem.username}#${sistem.discriminator}\``)

if (client.users.has(req.user.id) === true) {
client.users.get(req.user.id).send(`\`${sistem.username}#${sistem.discriminator}\` Your bot's profile / application has been successfully edited!`)
}

}})
}})

});

app.get("/bot/:botID/rapor", checkAuth, (req, res) => {

renderTemplate (res, req, "rapor.ejs");
});

app.post("/bot/:botID/rapor", checkAuth, (req, res) => {

let ayar = req.body

if(ayar['mesaj-1']) {
db.push(`botlar.${req.params.botID}.raporlar`, JSON.parse(`{ "rapor":"${ayar['mesaj-1']}" }`))
client.channels.get('714504798560583701').send(`User Name: \`${req.user.username}#${req.user.discriminator}\` Reported bot: \`${db.fetch(`botlar.${req.params.botID}.name`)}\` For Reason: \n**Reason:** \`${ayar['mesaj-1']}\``)
}
if(ayar['mesaj-2']) {
db.push(`botlar.${req.params.botID}.raporlar`, JSON.parse(`{ "rapor":"${ayar['mesaj-2']}" }`))
client.channels.get('714504798560583701').send(`User Name: \`${req.user.username}#${req.user.discriminator}\` Reported bot: \`${db.fetch(`botlar.${req.params.botID}.name`)}\` For Reason: \n**Reason:** \`${ayar['mesaj-2']}\``)
}

res.redirect('/bot/'+req.params.botID);
});

app.get("/kullanici/:userID/panel/:botID/sil", checkAuth, (req, res) => {
  var id = req.params.botID
  renderTemplate(res, req, "sil.ejs", {id}) 
});

app.post("/kullanici/:userID/panel/:botID/sil", checkAuth, (req, res) => {

let ID = req.params.botID

db.delete(`botlar.${ID}`) 
db.delete(`kbotlar.${req.user.id}.${ID}`)

res.redirect("/kullanici/"+req.params.userID+"/panel");
});

app.get("/bot/:botID", (req, res) => {
var id = req.params.botID

request({
url: `https://discordapp.com/api/v7/users/${id}`,
headers: {
"Authorization": `Bot ${process.env.TOKEN}`
},
}, function(error, response, body) {
if (error) return console.log(error)
else if (!error) {
var sistem = JSON.parse(body)

if (db.fetch(`${id}.avatar`) !== `https://cdn.discordapp.com/avatars/${sistem.id}/${sistem.avatar}.png`) {
db.set(`${id}.avatar`, `https://cdn.discordapp.com/avatars/${sistem.id}/${sistem.avatar}.png`)
}

}
})

renderTemplate(res, req, 'bot.ejs', {id})

});

app.get("/bot/:botID/hata", (req, res) => {
renderTemplate(res, req, "hata.ejs")
});

app.get("/bot/:botID/oyver", checkAuth, (req, res) => {

var id = req.params.botID
let user = req.user.id

var saat = `${new Date().getHours() + 3}:${new Date().getMinutes()}:${new Date().getSeconds()}`

if (db.has(`votes.${id}.${user}`) === true) {
  if (db.fetch(`votes.${id}.${user}`) !== saat) {
    res.redirect('/bot/'+req.params.botID+'/hata')
    return
  } else if (db.fetch(`votes.${id}.${user}`) === saat) {
  db.add(`botlar.${id}.vote`, 1)
  db.set(`votes.${id}.${user}`, saat)
  }
} else {
  db.add(`botlar.${id}.vote`, 1)
  db.set(`votes.${id}.${user}`, saat)
}

res.redirect('/bot/'+req.params.botID)

});
  
  app.get("/yetkili/hata", (req, res) => {renderTemplate(res, req, "hate.ejs")})

app.get("/yetkili", checkAuth, (req, res) => {
  if(!client.yetkililer.includes(req.user.id) ) return res.redirect('/yetkili/hata')
renderTemplate(res, req, "y-panel.ejs") 
});

app.get("/botyonetici/onayla/:botID", checkAuth, (req, res) => {
  if(!client.yetkililer.includes(req.user.id) ) return res.redirect('/yetkili/hata')
let id = req.params.botID

db.set(`botlar.${id}.status`, 'Approved')

res.redirect("/yetkili")

client.channels.get(client.ayarlar.kayıt).send(`Owner: \`${db.fetch(`botlar.${id}.owner`)}\` Bot: \`${db.fetch(`botlar.${id}.name`)}\` Admin: \`${req.user.username}#${req.user.discriminator}\` Approved The Bot!`)

if (client.users.has(db.fetch(`botlar.${id}.owner`)) === true) {
client.users.get(db.fetch(`botlar.${id}.ownerid`)).send(`\`${db.fetch(`botlar.${id}.name`)}\` Your bot has been approved! https://www.discords-bot-list.cf/bot/${db.fetch(`botlar.${id}.id`)}`)
}

});

app.get("/botyonetici/bekleme/:botID", checkAuth, (req, res) => {
  if(!client.yetkililer.includes(req.user.id) ) return res.redirect('/yetkili/hata')
let id = req.params.botID

db.set(`botlar.${id}.status`, 'Pending')

res.redirect("/yetkili")

client.channels.get(client.ayarlar.kayıt).send(`Owner: \`${db.fetch(`botlar.${id}.owner`)}\` Bot: \`${db.fetch(`botlar.${id}.name`)}\` Added It On Standby By: \`${req.user.username}#${req.user.discriminator}\``)

if (client.users.has(db.fetch(`botlar.${id}.ownerid`)) === true) {
client.users.get(db.fetch(`botlar.${id}.ownerid`)).send(`\`${db.fetch(`botlar.${id}.name`)}\` Your bot is under Review!`)
}

});

app.get("/botyonetici/reddet/:botID", checkAuth, (req, res) => {
  if(!client.yetkililer.includes(req.user.id) ) return res.redirect('/yetkili/hata')
  renderTemplate(res, req, "reddet.ejs")
});

app.post("/botyonetici/reddet/:botID", checkAuth, (req, res) => {
  if(!client.yetkililer.includes(req.user.id) ) return res.redirect('/yetkili/hata')
  let id = req.params.botID
  
  db.set(`botlar.${id}.status`, 'castaway')
  
  res.redirect("/yetkili")
  
  client.channels.get(client.ayarlar.kayıt).send(`Admin: \`${req.user.username}#${req.user.discriminator}\` declined Bot: \`${db.fetch(`botlar.${id}.name`)}\` Reason: \`${req.body['red-sebep']}\``)
  
  if (client.users.has(db.fetch(`botlar.${id}.ownerid`)) === true) {
  client.users.get(db.fetch(`botlar.${id}.ownerid`)).send(`Your Bot: \`${db.fetch(`botlar.${id}.name`)}\` Was declined due to: \`${req.body['red-sebep']}\``)
  }

  });

//API
  
app.get("/api", (req, res) => {
  renderTemplate(res, req, "api.ejs")
});

app.get("/api/botlar", (req, res) => {
  res.json({
    hata: 'Write a bot ID.'
  });
});

app.get("/api/botlar/:botID/votes", (req, res) => {
  res.json({
    hata: 'Write a user ID.'
  });
});

app.get("/api/botlar/:botID", (req, res) => {
   var id = req.params.botID

   if (db.has('botlar')) {
      if (Object.keys(db.fetch('botlar')).includes(id) === false) {
     res.json({
       hata: 'A bot with the ID you typed is not in the system.'
     });
   }
  }

    res.json({
       name: db.fetch(`botlar.${id}.name`),
       id: id,
avatar: db.fetch(`botlar.${id}.avatar`),
prefix: db.fetch(`botlar.${id}.prefix`),
library: db.fetch(`botlar.${id}.library`),
owner: db.fetch(`botlar.${id}.owner`),
ownerid: db.fetch(`botlar.${id}.ownerid`),
kisa_aciklama: db.fetch(`botlar.${id}.ShortDesc`),
uzun_aciklama: db.fetch(`botlar.${id}.uzunaciklama`),
etiketler: db.fetch(`botlar.${id}.tag`),
destek_sunucusu: db.fetch(`botlar.${id}.destek`) || 'Unspecified',
web_sitesi: db.fetch(`botlar.${id}.site`) || 'Unspecified',
github: db.fetch(`botlar.${id}.github`) || 'Unspecified',
status: db.has(`botlar.${id}.status`) ? db.fetch(`botlar.${id}.status`) : 'Pending',
oy_sayisi: db.fetch(`botlar.${id}.vote`) || 0,
certificate: db.fetch(`botlar.${id}.certificate`) || 'no'
    });
});

  app.get("/api/tumbotlar", (req, res) => {
    res.json(Object.keys(db.fetch('botlar')));
  });
  
app.get("/api/botlar/:botID/votes/:kullaniciID", (req, res) => {
  var id = req.params.botID
  var userr = req.params.kullaniciID

  if (db.has('botlar')) {
      if (Object.keys(db.fetch('botlar')).includes(id) === false) {
     res.json({
       hata: 'A bot with the ID you typed is not in the system.'
     });
   }
  }
 
   res.json({
     vote_durum: db.has(`votes.${id}.${userr}`) ? `Voted today.` : null,
     vote_sayisi: db.fetch(`botlar.${id}.vote`) || 0
   });

});

app.listen(3000);

//Blog

app.get("/blog", (req, res) => {
  res.redirect('/');
});
  
};
