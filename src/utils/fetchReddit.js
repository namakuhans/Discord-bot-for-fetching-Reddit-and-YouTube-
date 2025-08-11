// src/utils/fetchReddit.js
const fetch = require('node-fetch');

/**
 * Ambil postingan terbaru dari sebuah akun Reddit
 * @param {string} username - username Reddit tanpa "u/"
 * @returns {Promise<Object|null>} Data postingan terbaru atau null jika gagal
 */
async function fetchReddit(username) {
    try {
        const url = `https://www.reddit.com/user/${encodeURIComponent(username)}/submitted.json?limit=1`;
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'DiscordBot/1.0 by YourUsername'
            }
        });

        if (!res.ok) {
            console.error(`[fetchReddit] Gagal ambil data Reddit untuk ${username}: ${res.status}`);
            return null;
        }

        const data = await res.json();
        if (!data?.data?.children?.length) {
            return null;
        }

        const post = data.data.children[0].data;
        return {
            title: post.title,
            url: `https://reddit.com${post.permalink}`,
            subreddit: post.subreddit_name_prefixed,
            created_utc: post.created_utc,
            author: post.author
        };
    } catch (err) {
        console.error(`[fetchReddit] Error:`, err);
        return null;
    }
}

module.exports = fetchReddit;
