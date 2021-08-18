'use strict';

const firebase = require('./db');
const firestore = firebase.firestore();

const getLastNotification = async () => {
    try {
        const notification = await firestore.collection('notifications').doc('lastNotification').get();
        if (notification.empty)
            return false;
        return await notification.data();
    }catch(error){
        console.log(error);
    }
    return false;
};

const updateLastNotification = async (notification) => {
    try {
        await firestore.collection('notifications').doc('lastNotification').update(notification);
        return true;
    }catch(error){
        console.log(error);
    }
    return false;
}

module.exports = {
    getLastNotification,
    updateLastNotification
}