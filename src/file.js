const fs = require('fs');
const { readFile } = require('fs/promises')


const readNotification = async () => {

    let notification = false;
    const data = await readFile('./lastNotification.json', 'utf8');

    notification = JSON.parse(data);
    console.log(notification);
    return notification;
}

const writeNotification = async (notification) => {
    // convert JSON object to a string
    const data = JSON.stringify(notification);

    await fs.writeFile('./lastNotification.json', data, 'utf8', (err) => {
        if (err) console.log(`Error writing file: ${err}`);
        else console.log(`File is written successfully!`);
    });
}

// write file to disk
module.exports = {
    readNotification,
    writeNotification
}