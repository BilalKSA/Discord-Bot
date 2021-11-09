module.exports = (client) => {
    const channelIds = [
        '869419529900548136' // anime news
    ]

    const addreaction = message => {
        message.react('👍')
    
    setTimeout(() => {
        message.react('👎')
    }, 750);
}

client.on('message', message => {
    if (channelIds.includes(message.channel.id)){
        addreaction(message)
    }
})
}