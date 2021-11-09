const Discord = require('discord.js');

module.exports = (cleint) => {
    const channelID = '863721612460032000' // welcome channel
    const rulesChannel = '839942942609113184'
    const infoChannel = '869443611429851156'
    const roles = '869196979052371978'
    const booster = '869173175836090428'

    cleint.on('guildMemberAdd', (member) => {
        
        const welcome = new Discord.MessageEmbed()
            .setTitle(`Welcome to Bilal Basement`)
            .setDescription(">>> Read <#839942942609113184> and <#869443611429851156> \n get some Roles at <#869196979052371978> \n check out our boosters and perks at <#869173175836090428>")
            .setImage('https://tenor.com/view/welcome-anime-mask-greetings-gif-17495343')
            .setColor('EF8B87')
            .setFooter(member.user.tag)
            .setTimestamp()

        //const message = 

        const channel = member.guild.channels.cache.get(channelID)
        const RulesChannel = member.guild.channels.cache.get(rulesChannel)
        const InfoChannel = member.guild.channels.cache.get(infoChannel)
        const roleschannel = member.guild.channels.cache.get(roles)
        const boostchannel = member.guild.channels.cache.get(booster)

        channel.send(`yay, Welcome ${member}, hope you enjoy your stay!`, welcome)
    })
}