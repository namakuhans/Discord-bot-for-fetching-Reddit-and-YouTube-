// src/commands/pairReddit.js
const { SlashCommandBuilder } = require('discord.js');
const db = require('../utils/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pairreddit')
        .setDescription('Pair akun Reddit ke notifikasi bot')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Username Reddit (tanpa u/)')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const username = interaction.options.getString('username').trim();
        const guildId = interaction.guild.id;

        // Ambil data server dari DB
        let guildData = db.get('servers').find({ id: guildId }).value();
        if (!guildData) {
            db.get('servers').push({ id: guildId, reddit: [], youtube: [], channel: null }).write();
            guildData = db.get('servers').find({ id: guildId }).value();
        }

        // Cek apakah sudah terpair
        if (guildData.reddit.some(u => u.toLowerCase() === username.toLowerCase())) {
            return interaction.reply({ content: `❌ Akun Reddit **${username}** sudah terpair di server ini.`, ephemeral: true });
        }

        // Simpan ke DB
        db.get('servers')
            .find({ id: guildId })
            .get('reddit')
            .push(username)
            .write();

        await interaction.reply({ content: `✅ Akun Reddit **${username}** berhasil di-pair! Bot akan memantau postingan terbaru.`, ephemeral: false });
    }
};
