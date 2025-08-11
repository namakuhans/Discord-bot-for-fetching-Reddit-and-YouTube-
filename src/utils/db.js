// src/utils/db.js
const { join } = require('path');
const { Low, JSONFile } = require('lowdb');

// Lokasi file database
const file = join(__dirname, '../../data/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Struktur default database
async function initDB() {
    await db.read();
    db.data ||= { servers: [] };
    await db.write();
}

/**
 * Ambil data server berdasarkan ID
 * @param {string} guildId
 * @returns {object} data server
 */
function getServer(guildId) {
    let server = db.data.servers.find(s => s.id === guildId);
    if (!server) {
        server = {
            id: guildId,
            reddit: [],
            youtube: [],
            redditChannel: null,
            youtubeChannel: null
        };
        db.data.servers.push(server);
        db.write();
    }
    return server;
}

/**
 * Simpan database
 */
async function saveDB() {
    await db.write();
}

module.exports = {
    db,
    initDB,
    getServer,
    saveDB
};
