const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config');

const command = require('./commands');
const embeds = require('./embeds');
const schedule = require('node-schedule');
const crawler = require('./crawler');
const { writeNotification, readNotification } = require('./file');
const { mainChannelID } = require('./config');
const { getLastNotification, updateLastNotification } = require('./firebase/notificationController');

const readNotificationFromDiscord = async (channel) => {

    // Becuase the message varibable still refers to the command message,
    // this method will fetch the last message sent in the same channel as the command message.
    console.log(await channel.lastMessage);
    console.log(channel.messages.cache);
    channel.fetchMessages({ limit: 1 }).then(messages => {
        const lastMessage = messages.first();
        console.log(lastMessage.content);
    }).catch(err => { console.error(err) });
};

const getMainChannel = () => {
    const guild = client.guilds.cache.find(guild => guild.id === config.mainServerID);
    if (guild)
        return guild.channels.cache.find(channel => channel.id === config.mainChannelID);
    else
        console.log('Could not find the main guild. Bot is not added yet to the right server.');
    return null;
};

client.on('ready', () => {
    console.log('The client is ready!');

    const job = schedule.scheduleJob('* * * * *', async () => {
    // const job = schedule.scheduleJob('*/5 * * * *', async () => {
        console.log('Looking for the latest notifaction...');

        const mainChannel = getMainChannel();
        const notification = await crawler.parseNotification(`${config.notificationsUrl}`, true);
        const lastNotification = await getLastNotification();

        if (notification === false || lastNotification === false){
            console.log('Something went wrong during parsing..');
            return ;
        }else if (notification.name === lastNotification.name && notification.published === lastNotification.published && notification.url === lastNotification.url){
            console.log('No new notifications yet.');
        }else{
            console.log('Found a new notification!');
            if(updateLastNotification(notification))
                console.log('Updated db successfully!');
            else
                throw Error('Something went wrong on the update in the db!');
        
            if (mainChannel)
                embeds.sendNotification(mainChannel, notification);
        }
    });

    // command(client, 't', async message => {
    //     const channel = getMainChannel()
    //     const notification = await crawler.parseNotification(`${config.notificationsUrl}`, true);
    //     const lastNotification = await getLastNotification();
    //     if (notification.name === lastNotification.name && notification.published === lastNotification.published && notification.url === lastNotification.url)
    //         console.log('No new notifications yet.');
    //     else{
    //         console.log('Found a new notification!!');
    //         if(updateLastNotification(notification))
    //             console.log('Updated db successfully!');
    //         else
    //             throw Error('Something went wrong on the update in the db!');
    //     }
    // });
})

// Login the Bot
client.login(config.botToken);