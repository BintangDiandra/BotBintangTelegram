const TelegramBot = require('node-telegram-bot-api');

const token = "6505875511:AAFHT13uMhGQ--tuCFvA1mx4qeS4lHAJ-AM";
const options = {
    polling: true
}

const RadarGempa = new TelegramBot(token, options)

const prefix = "."
const prefix2 = "/"

const sayHi = new RegExp(`^${prefix}halo$`)
const gempa = new RegExp(`^${prefix}gempa$`)
const easteregg = new RegExp(`^${prefix}easteregg$`)
const start = new RegExp(`^${prefix2}start$`)
const source = new RegExp(`^${prefix}source$`)

RadarGempa.onText(start, (callback) => {
    RadarGempa.sendMessage(callback.from.id, "Selamat Datang di Bot Pendeteksi Gempa Indonesia fitur fitur yang tersedia :\n- .halo(Memulai 🤖)\n- .gempa(Informasi terbaru gempa 🌏)\n- .easteregg(Sesuatu rahasia🐇)\n- .source(Menampilkan Source🧐)\nNote ! : (Bot ini masih belum stabil karena belum di hosting)")
})

RadarGempa.onText(source, (callback) => {
    RadarGempa.sendMessage(callback.from.id, "Source Dan Api Digunakan :\nAPI BMKG = https://data.bmkg.go.id/gempabumi/\nAPI Token BOT = https://web.telegram.org/k/#@BotFather\nSource Dea Afrizal =  https://www.youtube.com/@deaafrizal")
})


RadarGempa.onText(easteregg, (callback) => {
    RadarGempa.sendMessage(callback.from.id, "https://www.youtube.com/watch?v=kImpWphugRY")
})

RadarGempa.onText(sayHi, (callback) => {
    RadarGempa.sendMessage(callback.from.id, "Halo, Saya adalah bot untuk mendeteksi gempa di Indonesia dengan menggunakan API resmi dari BMKG jika anda ingin melihat berita gempa anda bisa mengetik PROMPT /.gempa/ Terima-Kasih telah menggunakan bot simple ini.")
})

RadarGempa.onText(gempa, async (callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json")
    const {
        Infogempa: {
            gempa: {
                Jam, Magnitude, Tanggal, Wilayah, Dirasakan, Kedalaman, Shakemap
            }
        }
    } = await apiCall.json()
    const BMKGImage = BMKG_ENDPOINT + Shakemap
    const resultText = `
Waktu: ${Tanggal} | ${Jam}
Besaran: ${Magnitude}
Wilayah: ${Wilayah}
Daerah yang merasakan gempa: ${Dirasakan}
Kedalaman: ${Kedalaman}
`

    RadarGempa.sendPhoto(callback.from.id, BMKGImage, { caption: resultText })
})


const cb = function(req, res) {
    res.end(`${bot.options.username}`)
}

try {
    if(process.env.PROD) {
        bot.launch({
            webhook: {
                domain: `${process.env.URL}`,
                port: `${process.env.PORT}`,
                cb
            }
        })
    } else {
        bot.launch()
    }
} catch(e) {
}

