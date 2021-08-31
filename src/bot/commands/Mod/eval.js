const { Command } = require('klasa');
const performance = require("performance-now")
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            permissionLevel: 6,
            requiredPermissions: ['MANAGE_MESSAGES'],
            runIn: ['text'],
            description: 'Evaluates js code',
            usage: 'eval <code>',
            usageDelim: ' '
        });
    }

    async run(msg, args) {
        
        let { channel } = msg
        let { guild } = msg
        let { author } = msg
        let { member } = msg
           
        let start = performance()
        
        if(!args[0]) {
          let end = performance()
		const embed = new MessageEmbed()
      .setColor('c25034')
      .addField('Output:', `\`\`\`js` + '\n' + `Write code first!` + `\n` + `\`\`\`` , false)
      .addField('Input:', `\`\`\`ts` + '\n' + `None` + `\n` + `\`\`\`` , true)
      .addField('Type:', `\`\`\`ts` + '\n' + `None` + `\n` + `\`\`\`` , true)
      .addField('Time:', `\`\`\`js` + '\n' + `${Number(end - start).toFixed(2)} ms` + `\n` + `\`\`\`` , true)
      .setTimestamp()
      msg.sendMessage({embed: embed})}
      

let timetotal = "";
            let hidden = false
            let code = await args.join(" ");
            if(code.includes("--sh")) {
            hidden = true;
            code = code.replace("--sh","");
           }
      
      try {


            let timestart = performance()
            
            let evaled = await eval(code);
            let codeType = evaled?.constructor?.name ?? (typeof evaled);
            let timestop = performance()
            timetotal = timestop - timestart;

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0, showHidden: hidden});
        
            if (evaled.length > 1024)  {
            var emb = new MessageEmbed()
                .addField('Output:', "Attached as `Output.js`" , false)
                .addField('Type:', `\`\`\`js` + '\n' + `${firstUpperCase(codeType)}` + `\n` + `\`\`\`` , true)
                .addField('Time:', `\`\`\`js` + '\n' + `${Number(timetotal).toFixed(2)} ms` + `\n` + `\`\`\`` , true)
                .setColor("2f3136")
                .setTimestamp()
            return msg.sendMessage({embed: emb}).then(()=> msg.sendMessage(null, {files: [new MessageAttachment(Buffer.from(evaled, 'utf8'), 'Output.js')]}))
              
            }
        
            var emb = new MessageEmbed()
                .addField('Output:', `\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\`` , false)
                .addField('Type:', `\`\`\`js` + '\n' +  `${firstUpperCase(codeType)}` + `\n` + `\`\`\`` , true)
                .addField('Time:', `\`\`\`js` + '\n' + `${Number(timetotal).toFixed(2)} ms` + `\n` + `\`\`\`` , true)
                .setColor("2f3136")
                .setTimestamp()
            msg.sendMessage({embed: emb});
          
        } catch (err) {
            
            var emb = new MessageEmbed()
                .addField('Output:', `\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\`` , false)
                .addField('Input:', `\`\`\`js` + '\n' + clean(code) + `\n` + `\`\`\`` , true)
                .addField('Type:', `\`\`\`js` + '\n' + err.name + `\n` + `\`\`\`` , true)
                .addField('Time:', `\`\`\`js` + '\n' + `${Number(timetotal).toFixed(2)} ms` + `\n` + `\`\`\`` , true)
                .setColor("c25034")
                .setTimestamp()
            msg.sendMessage({embed: emb});
        }
    
  


    }



}

function clean(text) {
    if (typeof text === "string")
        return text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
} 

function firstUpperCase(text, split = ' ') {
      return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
    }