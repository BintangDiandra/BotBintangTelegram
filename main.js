const TelegramBot = require('node-telegram-bot-api');

const token = "6505875511:AAG7NDyaJBAGHxvJdLpIiwQlJEEjBDWYCGw";
const options = {
    polling: true
}

const RadarGempa = new TelegramBot(token, options)

const prefix = "."

const sayHi = new RegExp(`^${prefix}halo$`)
const gempa = new RegExp(`^${prefix}gempa$`)

RadarGempa.onText(sayHi, (callback) => {
    RadarGempa.sendMessage(callback.from.id, "Halo, Saya adalah bot untuk mendeteksi gempa di Indonesia dengan menggunakan API resmi dari BMKG jika anda ingin melihat berita gempa anda bisa mengetik PROMPT /.gempa/ Terima-Kasih telah menggunakan bot simple ini.")
})

RadarGempa.onText(gempa, async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json")
    const {
        Infogempa : { 
            gempa: {
                Jam, Magnitude, Tanggal, Wilayah, Potensi, Dirasakan,Kedalaman, Shakemap
            } 
        } 
    } = await apiCall.json()
    const BMKGImage = BMKG_ENDPOINT +  Shakemap
    const resultText = `
Waktu: ${Tanggal} | ${Jam}
Besaran: ${Magnitude}
Wilayah: ${Wilayah}
Potensi: ${Potensi}
Dirasakan: ${Dirasakan}
Kedalaman: ${Kedalaman}
`

    RadarGempa.sendPhoto(callback.from.id, BMKGImage, { caption: resultText })
})