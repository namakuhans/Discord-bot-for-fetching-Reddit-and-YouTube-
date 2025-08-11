// src/utils/fetchYouTube.js
const fetch = require('node-fetch');

const API_KEY = process.env.YOUTUBE_API_KEY; // Simpan API key di .env

/**
 * Ambil video terbaru dari channel YouTube
 * @param {string} channelId - ID channel YouTube
 * @returns {Promise<Object|null>} Data video terbaru atau null jika gagal
 */
async function fetchYouTube(channelId) {
    try {
        if (!API_KEY) {
            console.error('[fetchYouTube] API Key YouTube tidak ditemukan di environment.');
            return null;
        }

        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`;
        const res = await fetch(url);

        if (!res.ok) {
            console.error(`[fetchYouTube] Gagal ambil data YouTube untuk ${channelId}: ${res.status}`);
            return null;
        }

        const data = await res.json();
        if (!data?.items?.length) {
            return null;
        }

        const video = data.items[0];
        if (video.id.kind !== 'youtube#video') {
            return null; // Pastikan hasilnya adalah video, bukan playlist
        }

        return {
            title: video.snippet.title,
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
            publishedAt: video.snippet.publishedAt,
            channelTitle: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.high?.url || null
        };
    } catch (err) {
        console.error('[fetchYouTube] Error:', err);
        return null;
    }
}

module.exports = fetchYouTube;
