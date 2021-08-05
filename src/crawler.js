const fetch = require('node-fetch');
const cheerio = require('cheerio');

const parseNotification = async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    try {
        const notifNamePath = $('.gem-news-item-title').first().children('a');
        return {
            name: notifNamePath.text(),
            url: notifNamePath.attr('href'),
            published: $('.gem-news-item-date').first().text()
        }
    }catch(error){
        console.log(error);
        return false;
    }
}

module.exports = {
    parseNotification: parseNotification
}