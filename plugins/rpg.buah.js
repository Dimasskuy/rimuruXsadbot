let handler = async (m, { conn, usedPrefix }) => {
let user = global.db.data.users[m.sender]
let buah = `${htki} GUDANG BUAH ${htka}

🍌 ${user.pisang} Pisang
🍇 ${user.anggur} Anggur 
🥭 ${user.mangga} Mangga
🍊 ${user.jeruk} Jeruk
🍎 ${user.apel} Apel

Gunakan Command ${usedPrefix}sell Untuk Menjual Buah !`
conn.reply(m.chat, buah, wm, null, [['Menu', '.menu']], m)
}
handler.help = ['buah']
handler.tags = ['rpg']
handler.command = /^(buah|listbuah)$/i

module.exports = handler