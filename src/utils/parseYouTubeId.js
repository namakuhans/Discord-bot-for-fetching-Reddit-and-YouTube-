// src/utils/parseYouTubeId.js
const fetch = require('node-fetch');
const API_KEY = process.env.YOUTUBE_API_KEY;

/**
 * Parse URL atau ID YouTube menjadi channelId
 * @param {string} input - URL atau ID YouTube
 * @returns {Promise<string|null>} channelId atau null jika gagal
 */
async function parseYouTubeId(input) {
    try {
        if (!input) return null;

        // Jika sudah channelId (mulai dengan UC...), langsung return
        if (/^UC[\w-]{21}[AQgw]$/.test(input)) {
            return input;
        }

        // Ambil path dari URL
        let usernameOrId = input.trim();
        if (usernameOrId.startsWith('http')) {
            const url = new URL(usernameOrId);
            usernameOrId = url.pathname.replace(/^\/+/, ''); // hapus slash di awal
        }

        // Format /channel/UCxxxxx
        if (usernameOrId.startsWith('channel/')) {
            return usernameOrId.split('/')[1];
        }

        // Format /@username → pakai search channel by handle
        if (usernameOrId.startsWith('@')) {
            if (!API_KEY) return null;
            const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${usernameOrId}&type=channel&part=id`;
            const res = await fetch(searchUrl);
            const data = await res.json();
            return data?.items?.[0]?.id?.channelId || null;
        }

        // Format /user/username → pakai channels.list forUsername
        if (usernameOrId.startsWith('user/')) {
            if (!API_KEY) return null;
            const uname = usernameOrId.split('/')[1];
            const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=${uname}&part=id`);
            const data = await res.json();
            return data?.items?.[0]?.id || null;
        }

        // Format /c/username → cari lewat search API
        if (usernameOrId.startsWith('c/')) {
            if (!API_KEY) return null;
            const cname = usernameOrId.split('/')[1];
            const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${cname}&type=channel&part=id`;
            const res = await fetch(searchUrl);
            const data = await res.json();
            return data?.items?.[0]?.id?.channelId || null;
        }

        return null;
    } catch (err) {
        console.error('[parseYouTubeId] Error:', err);
        return null;
    }
}

module.exports = parseYouTubeId;
