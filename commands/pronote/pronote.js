const pronote = require('pronote-api-again');
const Discord = require('discord.js');

module.exports = {
    name: 'pronote',
    description: 'Get pronote information',
    aliases: [],
    usage: '<email> <mot de passe> (url)',
    cooldown: 10,
    args: true,
    owner: false,
    guildOnly: false,
    async execute(message, args) {
        const msg = message;
        message.delete();
        const email = args[0];
        const password = args[1];
        const url = args[2] ? "args[2]" : "https://0750663n.index-education.net/pronote/";
        
        try {
            const session = await pronote.login(url, email, password, "iledefrance");
            const marks = await session.marks(1);
            
            let marksEmbed = new Discord.MessageEmbed()
                .setTitle("Notes de " + session.user.name + " en " + session.user.studentClass.name);
            marksEmbed.addField("Bilan du trimestre", `Moyenne de la generale **${marks.averages.student}** Moyenne de la classe **${marks.averages.studentClass}**.`, false);    
            for (let i = 0; i < marks.subjects.length; i++) {
                marksEmbed.addField(i + " . " + marks.subjects[i].name, `Moyenne: **${marks.subjects[i].averages.student}** Max and min: **${marks.subjects[i].averages.max}** > **${marks.subjects[i].averages.min}** Moyenne classe: **${marks.subjects[i].averages.studentClass}**`, true);
            };

             if (marks.averages.student >= 15.00) {
                marksEmbed.setColor('#89FC00');
            } else if (marks.averages.student >= 10 ) {
                marksEmbed.addColor('#F5B700');
            } else {
               marksEmbed.addColor('#DC0073');
            };

            msg.channel.send(marksEmbed);

        } catch (err) {
            if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                message.channel.send('Mauvais identifiants');    
            } else {
                message.channel.send(err);
            }
        
        }
    }
};