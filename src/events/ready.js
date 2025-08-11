// src/events/ready.js
const { initDB } = require('../utils/db');
const redditChecker = require('../services/redditChecker');
const youtubeChecker = require('../services/youtubeChecker');

module.exports = async (client) => {
    console.log(`✅ Bot login sebagai ${client.user.tag}`);
    
    // Inisialisasi database
    await initDB();

    // Loop pengecekan tiap 2 menit
    setInterval(async () => {
        await redditChecker(client);
        await youtubeChecker(client);
    }, 2 * 60 * 1000); // 2 menit
};
