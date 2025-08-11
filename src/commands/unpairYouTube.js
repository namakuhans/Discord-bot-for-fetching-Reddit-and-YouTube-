// src/commands/unpairYouTube.js
const { SlashCommandBuilder } = require('discord.js');
const db = require('../utils/db');
const parseYouTubeID = require('../utils/parseYouTubeID');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpairyoutube')
        .setDescription('Hapus pairing channel YouTube dari bot')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL atau nama channel YouTube yang ingin dihapus')
                .setRequired(true)
        ),

    async execute(interaction) {
        const url = interaction.options.getString('url').trim();
        const guildId = interaction.guild.id;

        // Ambil channel ID
        const channelId = await parseYouTubeID(url);
        if (!channelId) {
            return interaction.reply({ content: '❌ Gagal mendapatkan Channel ID dari URL tersebut.', ephemeral: true });
        }

        // Ambil data server dari DB
        const guildData = db.get('servers').find({ id: guildId }).value();
        if (!guildData || !guildData.youtube.includes(channelId)) {
            return interaction.reply({ content: `❌ Channel ID **${channelId}** tidak ditemukan dalam pairing server ini.`, ephemeral: true });
        }

        // Hapus dari DB
        db.get('servers')
            .find({ id: guildId })
            .get('youtube')
            .remove(id => id === channelId)
            .write();

        await interaction.reply({ content: `✅ Channel YouTube dengan ID **${channelId}** berhasil dihapus dari pairing.`, ephemeral: false });
    }
};
