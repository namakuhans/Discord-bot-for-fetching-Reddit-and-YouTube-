// src/commands/pairYouTube.js
const { SlashCommandBuilder } = require('discord.js');
const db = require('../utils/db');
const parseYouTubeID = require('../utils/parseYouTubeID');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pairyoutube')
        .setDescription('Pair channel YouTube ke notifikasi bot')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL channel YouTube atau custom name')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const url = interaction.options.getString('url').trim();
        const guildId = interaction.guild.id;

        // Ambil channel ID dari URL atau username
        const channelId = await parseYouTubeID(url);
        if (!channelId) {
            return interaction.reply({ content: '❌ Gagal mendapatkan Channel ID dari URL tersebut.', ephemeral: true });
        }

        // Ambil data server dari DB
        let guildData = db.get('servers').find({ id: guildId }).value();
        if (!guildData) {
            db.get('servers').push({ id: guildId, reddit: [], youtube: [], channel: null }).write();
            guildData = db.get('servers').find({ id: guildId }).value();
        }

        // Cek apakah sudah terpair
        if (guildData.youtube.some(id => id === channelId)) {
            return interaction.reply({ content: `❌ Channel YouTube dengan ID **${channelId}** sudah terpair di server ini.`, ephemeral: true });
        }

        // Simpan ke DB
        db.get('servers')
            .find({ id: guildId })
            .get('youtube')
            .push(channelId)
            .write();

        await interaction.reply({ content: `✅ Channel YouTube berhasil di-pair! Bot akan memantau video terbaru.`, ephemeral: false });
    }
};
