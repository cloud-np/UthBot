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
    UTH_IMG_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} = process.env;


module.exports = {
    botToken: BOT_TOKEN,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
    },
    testBotToken: TEST_BOT_TOKEN,
    notificationsUrl: NOTIFICATIONS_URL,
    prefix: PREFIX,
    uthImgUrl: UTH_IMG_URL,
    mainChannelID: MAIN_CHANNEL_ID,
    mainServerID: MAIN_SERVER_ID,
    testServerID: TEST_SERVER_ID
}