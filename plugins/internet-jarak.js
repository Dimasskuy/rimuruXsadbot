const axios = require('axios');
const cheerio = require('cheerio');

const jarakHandler = async (m, { conn, text, usedPrefix, command }) => {
    let [from, to] = text.split(/[^\w\s]/g);
    if (!(from && to)) throw `Ex: ${usedPrefix + command} jakarta|bandung`;
    let data = await jarak(from, to);
    if (data.img) return conn.sendMessage(m.chat, { image: data.img, caption: data.desc }, { quoted: m });
    else m.reply(data.desc);
};

jarakHandler.help = ['jarak'];
jarakHandler.tags = ['internet'];
jarakHandler.command = ['jarak'];
jarakHandler.limit = true;

module.exports = jarakHandler;

async function jarak(dari, ke) {
    let html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`)).data;
    let $ = cheerio.load(html), obj = {};
    let img = html.split("var s=\'")?.[1]?.split("\'")?.[0];
    obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : '';
    obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim();
    return obj;
}