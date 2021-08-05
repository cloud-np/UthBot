'use strict';
const dotenv = require('dotenv');
dotenv.config();

const {
    TEST_BOT_TOKEN,
    BOT_TOKEN,
    PREFIX,
    MAIN_SERVER_ID,
    TEST_SERVER_ID,
    MAIN_CHANNEL_ID,
    NOTIFICATIONS_URL,
    UTH_IMG_URL
} = process.env;


module.exports = {
    botToken: BOT_TOKEN,
    testBotToken: TEST_BOT_TOKEN,
    notificationsUrl: NOTIFICATIONS_URL,
    prefix: PREFIX,
    uthImgUrl: UTH_IMG_URL,
    mainChannelID: MAIN_CHANNEL_ID,
    mainServerID: MAIN_SERVER_ID,
    testServerID: TEST_SERVER_ID
}