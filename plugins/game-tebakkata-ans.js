const similarity = require('similarity');
const threshold = 0.72;

async function before(m) {
    let id = m.chat;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*teka/i.test(m.quoted.text) || /.*(hint|teka)/i.test(m.text))
        return true;

    this.tebakkata = this.tebakkata ? this.tebakkata : {};

    if (!(id in this.tebakkata))
        return conn.reply(m.chat, '❗Soal itu telah berakhir', m);

    if (m.quoted.id == this.tebakkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkata[id][1]));

        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakkata[id][2];
            conn.reply(m.chat, `*🎉Benar!*\n\n💥+${this.tebakkata[id][2]} XP`, m);
            clearTimeout(this.tebakkata[id][3]);
            delete this.tebakkata[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*💢Dikit Lagi!*`);
        } else {
            m.reply(`*🚫Salah!*`);
        }
    }

    return true;
}

module.exports.before = before;
module.exports.exp = 0;