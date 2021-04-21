const cpuStat = require('cpu-stat')
const moment = require("moment")
require("moment-duration-format");
const Discord = require("discord.js")
const os = require('os')

module.exports = {
	name: 'bot-info',
	description: 'Return bot info',
	aliases: ['bot', 'binfo', 'ibot', 'darwin'],
	usage: '[command name]',
	cooldown: 10,
	execute(message, args) {
        const { version } = require('discord.js');

        cpuStat.usagePercent(function(percent) {
            const duration = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            let embedStats = new Discord.MessageEmbed()
                .setColor("f3f3f3")
                .setTitle("__**Informations du bot**__")
                .addField('Créateur du bot : "pfevrety#1908" <pfevrety:404585725565337610> ')
                .addField("RAM Utilisée ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                .addField("En ligne depuis ⏲", (Math.round(message.client.uptime / (1000 * 60 * 60 * 24)) % 30) + " Jours, " + (Math.round(message.client.uptime / (1000 * 60 * 60))) + " h, " + (Math.round(message.client.uptime / (1000 * 60)) % 60) + " min, est " + (Math.round(message.client.uptime / 1000) % 60) + " sec", true)
                .addField("Utilisateurs :baby::skin-tone-2: ", `2`, true)
                .addField("Serveurs ", `2`, true)
                .addField("Discord.js ", `v${version}`, true)
                .addField("Node ", `${process.version}`, true)
                .addField("CPU ", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
                .addField("Utilisation du CPU ", `\`${percent.toFixed(2)}%\``, true)
                .addField("Architecture", `\`${os.arch()}\``, true)
                .addField("Platforme", `\`\`${os.platform()}\`\``, true)
                .addField("Language de Dev du bot :", "Javascript");
                    message.channel.send(embedStats);

        })
    },  
};