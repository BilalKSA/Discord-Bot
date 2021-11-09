const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')
const reactRole = require('./reaction-role')
const poll = require('./polls')
const welcome = require('./welcome')
const memberCount = require('./memberCount')

client.on('ready', () => {
    console.log('Bot is online')
    client.user.setPresence({activity:{name: '!help', type: 'CUSTOM_STATUS', },status: 'dnd'})

    firstMessage(client, '839942942609113184', `> 1 - Don't send SPAM Messages
    > 2 - Keep it safe   
    `, ['✅'])

    command(client, 'ping', message => {
        message.channel.send('Pong!')
    })

    command(client, ['clear', 'clearChannel'], message => {
        if (message.member.hasPermission('Mange Messages')){
            message.channel.messages.fetch().then(count => {
                message.channel.bulkDelete(count);
            })
        }
    })

    privateMessage(client, 'ping', 'Pong')

    command(client, 'baka', message => {
        const baka = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setDescription('```is baaka```')
            .setImage('https://media1.tenor.com/images/011a63f6cf8e9643a40814d295d9f393/tenor.gif?itemid=20933720')
        message.channel.send(baka)
        
    })

    command(client, 'server', message => {
        const { guild } = message
        const { name, id, memberCount, region, owner, afkTimeout, ownerID} = guild
        const icon = guild.iconURL()
        const ServerID = guild.id
        const afktimeout = afkTimeout / 60 
        
        const server = new Discord.MessageEmbed()
            .setTitle(`${name} Server Info `)
            .setThumbnail(icon)
            .addFields({
                name: "Region",
                value: `> ${region}`
            },{
                name: 'OwnerShip',
                value:  `> ${owner}`
            },{
                name: "afkTimeOut",
                value: `> ${afktimeout}` + 'm'
            },{
                name: "MemberCount",
                value: `> ${memberCount}`
            },)
            .setFooter("ServerID : " + ServerID)
            
            
        message.channel.send(server)
    })

    command(client, 'help', message => {
        const { prefix } = config
        const help_icon = 'https://cdn.discordapp.com/avatars/825587032025071626/24cba000eb3f6f84c8f2239f4a98dff2.png?size=1024'
        const help = new Discord.MessageEmbed()
            .setTitle('help Command')
            .addFields(
                {
                    name: " <:XD:780852858668318770> Categories",
                    value: `[**Youtube**](https://youtube.com)
                            https://netflix.com`
                },
            )
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()
            .setColor('E05177')
        message.channel.send(help)
    })

    client.on('message', msg => {
        if (msg.content == "brb"){
            msg.reply('Tyt <a:love_hearts:868955995370573844>')
        }
    })

    client.on('message', msg => { 
        if (msg.content == "السلام عليكم" || msg.content == 'السلام عليكم ورحمة الله وبركاته')
            msg.reply('وعليكم السلام والرحمة <a:movinghearts:868957182367002624>')
    })

    client.on('message', msg => {
        if(msg.content === 'باك' || msg.content === 'back'){
            msg.reply('ولكم باك منور <a:welcome:875389566700355614>', { fetchReply: true })
        }
    })

    reactRole(client)

    const hook = new Discord.WebhookClient('869298512238641174', '2-6UqQE8onc7w4VWEzc2JR4Uy14D4TYBvm1vt4WWvMqokIM0OGz7xQ5l3WhFODnhhvNR')
    hook.send('test')

    client.on('message', msg => {
        if(msg.content == 'برب'){
            msg.reply('تيت يا عسل <a:bye_love:869286109476163595>')
        }
    })

    command(client, 'ban', message => {
        const { member, mentions, reason } = message

        const tag = `${member.id}`

        if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
            const target = mentions.users.first()
            if(target){
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban({days: 7, reason: reason})
                message.channel.send(`<@${tag}> ${targetMember} has been banned`)
            }else{
                message.channel.send(`<@${tag}> Can't find the member`)
            }
        }else{ 
            message.channel.send(`<@${tag}> You Don't Have Permisson To Use This Command`)
        }
    })

    command(client, 'kick', message => {
        const { member, mentions } = message

        const tag = `${member.id}`

        if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')) {
            const target = mentions.users.first()
            if(target){
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`<@${tag}> ${targetMember} has been kicked`)
            }else{
                message.channel.send(`<@${tag}> Can't find the member`)
            }
        }else{ 
            message.channel.send(`<@${tag}> You Don't Have Permisson To Use This Command`)
        }
    })

    poll(client)

    welcome(client)

    memberCount(client)
});

client.login(config.token)