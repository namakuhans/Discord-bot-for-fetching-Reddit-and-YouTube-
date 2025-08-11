// src/services/youtubeChecker.js
const { EmbedBuilder } = require('discord.js');
const fetchYouTube = require('../utils/fetchYouTube');
const { getServer, saveDB, db } = require('../utils/db');

/**
 * Mengecek update YouTube untuk semua server
 * @param {object} client - Discord client
 */
async function youtubeChecker(client) {
    try {
        await db.read();

        for (const server of db.data.servers) {
            if (!server.youtube.length || !server.youtubeChannel) continue;

            const channel = client.channels.cache.get(server.youtubeChannel);
            if (!channel) continue;

            for (const yt of server.youtube) {
                const latestVideo = await fetchYouTube(yt.channelId);
                if (!latestVideo) continue;

                // Skip jika sudah pernah dipost
                if (yt.lastVideoId === latestVideo.id) continue;

                // Update last video ID di database
                yt.lastVideoId = latestVideo.id;
                await saveDB();

                // Kirim embed notifikasi
                const embed = new EmbedBuilder()
                    .setTitle(`📺 YouTube Update dari ${yt.name || yt.channelId}`)
                    .setURL(`https://www.youtube.com/watch?v=${latestVideo.id}`)
                    .setDescription(latestVideo.title || '(Tanpa judul)')
                    .setThumbnail(latestVideo.thumbnail)
                    .setColor(0xFF0000)
                    .setFooter({ text: `Diposting pada ${new Date(latestVideo.publishedAt).toLocaleString()}` });

                await channel.send({
                    content: '@everyone Video baru di YouTube!',
                    embeds: [embed]
                });
            }
        }
    } catch (err) {
        console.error('[youtubeChecker] Error:', err);
    }
}

module.exports = youtubeChecker;
