# Discord Reddit & YouTube Notifier Bot

Bot Discord yang dapat **pairing** ke akun Reddit dan YouTube untuk memantau postingan/video terbaru, lalu mengirim notifikasi ke channel Discord secara otomatis.  
Mirip seperti **Pingcord** untuk YouTube, tapi ditambah dukungan Reddit.

---

## ✨ Fitur
- 🔗 **Pairing akun Reddit** — Bot akan memantau postingan terbaru dari user/subreddit yang dipair.
- 📺 **Pairing akun YouTube** — Bot akan memantau video terbaru dari channel YouTube yang dipair.
- 📢 **Notifikasi otomatis** — Mengirim pesan ke channel Discord beserta tag `@everyone`.
- 🎮 **Rich Presence (RPC)** — Menampilkan status custom pada bot (icon besar/kecil, state, dan detail).
- 📂 **Database ringan** — Menggunakan `lowdb` dengan format JSON.
- 🛠 **Perintah Slash Command** — Semua perintah berbasis `/command`.

---

## 📂 Struktur Folder
```txt
discord-reddit-youtube-bot/
├── index.js
├── package.json
├── config.json
├── data/
│ └── db.json
├── src/
│ ├── commands/
│ ├── utils/
│ ├── services/
│ ├── events/
│ └── features/
```

---

## 📦 Instalasi
1. **Clone repository**
   ```bash
   git clone https://github.com/username/discord-reddit-youtube-bot.git
   cd discord-reddit-youtube-bot
   ```
   
2. **Install dependencies**
```
npm install
```
    
3. **Konfigurasi config.json**
```json
{
  "token": "DISCORD_BOT_TOKEN_KAMU",
  "clientId": "DISCORD_CLIENT_ID",
  "reddit": {
    "username": "USERNAME_REDDIT",
    "password": "PASSWORD_REDDIT",
    "clientId": "REDDIT_CLIENT_ID",
    "clientSecret": "REDDIT_CLIENT_SECRET",
    "userAgent": "DiscordRedditBot/1.0"
  },
  "youtube": {
    "apiKey": "YOUTUBE_API_KEY"
  }
}
```

4. **Jalankan bot**
```
npm run start
   ```

atau untuk mode pengembangan
```bash
npm run dev
```

---

💻 **Daftar Perintah**

Perintah	Deskripsi
```txt
/pairreddit <username>	Pair akun Reddit untuk dipantau.
/unpairreddit	Hapus pairing akun Reddit.
/setredditchannel <channel>	Set channel Discord untuk notifikasi Reddit.
/pairyoutube <channelId>	Pair channel YouTube untuk dipantau.
/unpairyoutube	Hapus pairing channel YouTube.
/setyoutubechannel <channel>	Set channel Discord untuk notifikasi YouTube.
/help	Menampilkan daftar perintah.
```

---

**⚙ Teknologi**

discord.js — Library utama untuk Discord Bot

Axios — HTTP Client

LowDB — Database JSON

YouTube Data API v3 — API YouTube

Reddit API — API Reddit

---

**📜 Lisensi**
MIT License — Silakan digunakan, dimodifikasi, dan dikembangkan sesuai kebutuhan.
