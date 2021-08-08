const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config');

const command = require('./commands');
const embeds = require('./embeds');
const schedule = require('node-schedule');
const crawler = require('./crawler');
const { writeNotification, readNotification } = require('./file');

client.on('ready', () => {
    console.log('The client is ready!');

    const job = schedule.scheduleJob('*/5 * * * *', async () => {
        console.log('Looking for the latest notifaction...');

        const notification = await crawler.parseNotification(`${config.notificationsUrl}`, true);
        const lastNotification = await readNotification();
        // console.log('Old noti: ', {lastNotification});
        // console.log('New noti: ', {notification});

        if (notification === false || lastNotification === false){
            // embeds.sendParseError(message);
            console.log('Something went wrong during parsing..');
            return ;
        }else if (notification.name === lastNotification.name && notification.published === lastNotification.published && notification.url === lastNotification.url){
            console.log('No new notifications yet.');
        }else{
            console.log('Found a new notification!');

            const guildID = config.mainServerID;
            const channelID = config.mainChannelID;
            const guild = client.guilds.cache.find(guild => guild.id === guildID);
            let channel;
            if (guild){
                channel = guild.channels.cache.find(channel => channel.id === channelID);
                writeNotification(notification);
                embeds.sendNotification(channel, notification);
            }else{
                console.log('Could not find the main guild. Bot is not added yet to the right server.');
            }

        }
    });

    command(client, 't', async message => {
        const notification = readNotification();
    });
    // command(client, 't', async message => {
    //     // Remove spaces and keep the message from the user.
    //     // const url = message.content.split(' ').join('').split(config.prefix + 'check')[1];
    //     const notification = await crawler.parseNotification(`${config.notificationsUrl}`, true);
    //     if (notification === false){
    //         embeds.sendParseError(message);
    //         return ;
    //     }
    //     embeds.sendNotification(message.channel, notification);
    //     // const user = client.users.cache.get(message.author.id);
    // });
})

// Login the Bot
client.login(config.botToken);