const Discord = require('discord.js');
const config = require('./config');


// const test = (message) => {
//     const partyblob = '<a:partyblob:866343043442671647>'
//     const em = new Discord.MessageEmbed()
//         .setColor('#00d31c')
//         .setAuthor(' Test!')
//         .addFields(
//             { name: partyblob, value: ''},
//         )
//         .setTimestamp();
//     message.channel.send(em);
// }

const sendParseError = (channel) => {
    const em = new Discord.MessageEmbed()
        .setColor('#ed3434')
        .setAuthor('❌ The item you suggested doesn\' have enought ratings.')
        .addFields(
            { name: 'Not enough info', value: 'For now we can not parse items with not enough info.' }
        )
        .setTimestamp();
    channel.send(em);
}

const sendNotification = (channel, notification) => {
    // const partyblob = '<a:partyblob:866343043442671647>'
    const em = new Discord.MessageEmbed()
        .setColor('#b03931')
        .setAuthor('Νέα ανακοίνωση!', `${config.uthImgUrl}`, notification.url)
        .setURL(notification.url)
        .setTitle(notification.name)
        .addFields(
            { name: 'Δημοσιεύτηκε', value: notification.published },
        )
        .setTimestamp();
    channel.send(em);
}

module.exports = {
    sendParseError,
    // test,
    sendNotification
}