// src/services/redditChecker.js
const { EmbedBuilder } = require('discord.js');
const fetchReddit = require('../utils/fetchReddit');
const { getServer, saveDB } = require('../utils/db');

/**
 * Mengecek update Reddit untuk semua server
 * @param {object} client - Discord client
 */
async function redditChecker(client) {
    try {
        const db = require('../utils/db').db;
        await db.read();

        for (const server of db.data.servers) {
            if (!server.reddit.length || !server.redditChannel) continue;

            const channel = client.channels.cache.get(server.redditChannel);
            if (!channel) continue;

            for (const user of server.reddit) {
                const latestPost = await fetchReddit(user.username);
                if (!latestPost) continue;

                // Jika postingan sudah pernah di-post, skip
                if (user.lastPostId === latestPost.id) continue;

                // Update last post ID di database
                user.lastPostId = latestPost.id;
                await saveDB();

                // Kirim embed notifikasi
                const embed = new EmbedBuilder()
                    .setTitle(`📢 Reddit Update dari u/${user.username}`)
                    .setURL(latestPost.url)
                    .setDescription(latestPost.title || '(Tanpa judul)')
                    .setColor(0xFF4500)
                    .setFooter({ text: `Diposting pada ${new Date(latestPost.createdUtc * 1000).toLocaleString()}` });

                await channel.send({
                    content: '@everyone Postingan baru dari Reddit!',
                    embeds: [embed]
                });
            }
        }
    } catch (err) {
        console.error('[redditChecker] Error:', err);
    }
}

module.exports = redditChecker;
