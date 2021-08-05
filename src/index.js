const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config');

const command = require('./commands');
const embeds = require('./embeds');
const schedule = require('node-schedule');
const crawler = require('./crawler');

const getDefaultChannel = (guild) => {
    // get "original" default channel
    if(guild.channels.cache.has(guild.id))
      return guild.channels.cache.get(guild.id)
  
    // Check for a "general" channel, which is often default chat
    const generalChannel = guild.channels.cache.find(channel => channel.name === "general");
    if (generalChannel)
      return generalChannel;
    // Now we get into the heavy stuff: first channel in order where the bot can speak
    // hold on to your hats!
    return guild.channels.cache
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
     .sort((a, b) => a.position - b.position ||
       Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
     .first();
}

  
client.on('ready', () => {
    console.log('The client is ready!');

    command(client, 'ping', message => {
        message.channel.send("Pong!");
    });

    command(client, 'help', message => {
        embeds.sendHelp(message);
    });

    command(client, 'show-tracked', async message => {
        const subItems = await itemController.getUserSubItems(message.author.id);
        embeds.sendShowTrackedItems(message, subItems);
    });

    let lastNotification = {name: '', published: '', url: ''};    
    const job = schedule.scheduleJob('*/5 * * * *', async function(){
        console.log('Looking for the latest notifaction...');

        const notification = await crawler.parseNotification(`${config.notificationsUrl}`, true);

        if (notification === false){
            embeds.sendParseError(message);
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
                lastNotification = notification;
                embeds.sendNotification(channel, notification);
            }else{
                console.log('Could not find the main guild. Bot is not added yet to the right server.');
            }

        }
    });

    command(client, 't', async message => {
        // Remove spaces and keep the message from the user.
        // const url = message.content.split(' ').join('').split(config.prefix + 'check')[1];
        const notification = await crawler.parseNotification(`${config.notificationsUrl}`, true);
        if (notification === false){
            embeds.sendParseError(message);
            return ;
        }
        embeds.sendNotification(message.channel, notification);
        // const user = client.users.cache.get(message.author.id);
    });
})

// Login the Bot
client.login(config.botToken);