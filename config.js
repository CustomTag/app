module.exports = {
  bot: {
    token: "OTAyMjEzODA3NjA1MTcwMTc2.YXbKFg.cAfmKBRCwIpTmaKs7yRQsb7DlJE",
    prefix: "dt!",
    owners: ["493042603181342730","414075055023063040", "484010160981934100"],
    mongourl: "mongodb+srv://DiscordTown-Manager:8CFpjWFy12167fAM@database.saobr.gcp.mongodb.net/DiscordTown",
    servers: {
      token: "OTAyMjUwODU0ODY4OTg3OTE0.YXbslg.6U_QPy6LrmfARJCs1Q_FnkiG0KY",
      prefix: "dts!"
    }
  },

  website: {
    callback: "https://discordtown.glitch.me/callback",
    secret: "H62aJ6Hkac-ssBaSt3731wy3IhjnPsnu",
    clientID: "902213807605170176", // Bot client id.
    tags: ["Moderation", "Fun", "Minecraft", "Economy", "Guard", "NSFW", "Anime", "Invite", "Music", "Logging", "Web Dashboard", "Reddit", "Youtube", "Twitch", "Crypto", "Leveling", "Game", "Roleplay", "Utility", "Turkish"],
    reporttags: ["Choose one...","NSFW content","API abuse","Malicious use of bot page","Copycat","Doesn't work","Other"],
    languages: [
      { flag: 'gb', code: 'en', name: 'English' },
      { flag: 'in', code: 'hi', name: 'हिंदी' },
      { flag: 'in', code: 'te', name: 'తెలుగు' },
      { flag: 'tr', code: 'tr', name: 'Türkçe' },
      { flag: 'de', code: 'de', name: 'Deutsch' },
      { flag: 'it', code: 'it', name: 'Italiano' },
      { flag: 'ne', code: 'ne', name: 'नेपाली' },
      { flag: 'ar', code: 'ar', name: 'العربية' },
      { flag: 'fr', code: 'fr', name: 'French' },
      { flag: 'pl', code: 'pl', name: 'Polish' }
    ],
    servers: {
      tags: [
        {
          icon: "fal fa-code",
          name: "Development"
        },
        {
          icon: "fal fa-play",
          name: "Stream"
        },
        {
          icon: "fal fa-camera",
          name: "Media"
        },
        {
          icon: 'fal fa-building',
          name: 'Company'
        },
        {
          icon: 'fal fa-gamepad',
          name: 'Game'
        },
        {
          icon: 'fal fa-icons',
          name: 'Emoji'
        },
        {
          icon: 'fal fa-robot',
          name: 'Bot List'
        },
        {
          icon: 'fal fa-server',
          name: 'Server List'
        },
        {
          icon: 'fal fa-moon-stars',
          name: 'Turkish'
        },
        {
          icon: 'fab fa-discord',
          name: 'Support'
        },
        {
          icon: 'fal fa-volume',
          name: 'Sound'
        },
        {
          icon: 'fal fa-comments',
          name: 'Chatting'
        },
        {
          icon: 'fal fa-lips',
          name: 'NSFW'
        },
        {
          icon: "fal fa-comment-slash",
          name: "Challange"
        },
        {
          icon: "fal fa-hand-rock",
          name: "Protest"
        },
        {
          icon: "fal fa-headphones-alt",
          name: "Roleplay"
        },
        {
          icon: "fal fa-grin-alt",
          name: "Meme"
        },
        {
          icon: "fal fa-shopping-cart",
          name: "Shop"
        },
        {
          icon: "fal fa-desktop",
          name: "Technology"
        },
        {
          icon: "fal fa-laugh",
          name: "Fun"
        },
        {
          icon: "fal fa-share-alt",
          name: "Social"
        },
        {
          icon: "fal fa-laptop",
          name: "E-Spor"
        },
        {
          icon: 'fal fa-palette',
          name: 'Design'
        },
        {
          icon: 'fal fa-users',
          name: 'Community'
        }
      ]
    }
  },

  server: {
    id: "902198115908603904", // DisBots.xyz Server ID
    invite: "https://discord.gg/nnfdQQaVhK",
    dblinvite: "https://discord.com/api/oauth2/authorize?client_id=902250854868987914&permissions=8&scope=bot",
    roles: {
      yonetici: "", // Team roleid
      manager: "",// Community Manager Role Id
      booster: "", // Server booster Role ID
      sponsor: "", // Sponsor Role id
      community: "", // Community Role id
      supporter: "",// Supporter Role id
      partnerRole: "", // Partner Role id
      site_creator: "",// Site Creator Role id
      administrator: "", // Team Role id Again
      moderator: "", // bot tester Role id
      moderatorrole: "", // Server Moderator Role id
      profile: {
        sitecreator:"", // Site Creator Role id
        booster: "",// Server booster Role ID
        community: "",// Community Role id
        sponsor: "", // Sponsor Role id
        supporter: "", // Supporter Role id
        manager: "", // Community Manager Role Id
        partnerRole: "" // Partner Role id
      },
      codeshare: {
        python: "PY",
        javascript: "JS",
        html: "HTML",
        substructure: "Substructure",
        bdfd: "BDFD", // Bot Designer For Discord
        fiveInvite: "5 INVITES",
        tenInvite: "10 INVITES",
        fifteenInvite: "15 INVITES",
        twentyInvite: "20 INVITES"
      },
      botlist: {
        ownerserver: "", // Server Owner Role ID
        developer: "", // Bot Developer Role ID
        certified_developer: "",// Certified Bot Developer Role ID
        boosted_developer: "", // Boosted Bot Developer Role ID
        promoted_developer: "",// Promoted Bot Developer Role ID
        premium_developer: "",// Premium Server Owner Role ID
        bot: "",// Approved Bot Role ID
        boosted_bot: "", // Boosted Bot Role ID
        promoted_bot: "",// Promoted Bot Role ID
        certified_bot: ""// Certified Bot Role ID
      }
    },
    channels: {
      codelog: "", // Code Log
      login: "",// Login Log
      webstatus: "",// Website Status Log
      uptimelog: "",// Uptime Log
      botlog: "",// bot Log
      reportlog: "",// bot report Log
      votes: ""// Vote Log Log
    }
  }


}