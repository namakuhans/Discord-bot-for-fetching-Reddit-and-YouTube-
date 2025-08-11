// src/commands/unpairReddit.js
const { SlashCommandBuilder } = require('discord.js');
const db = require('../utils/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpairreddit')
        .setDescription('Hapus pairing akun Reddit dari bot')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Username Reddit yang ingin dihapus')
                .setRequired(true)
        ),

    async execute(interaction) {
        const username = interaction.options.getString('username').trim();
        const guildId = interaction.guild.id;

        // Ambil data server dari DB
        const guildData = db.get('servers').find({ id: guildId }).value();
        if (!guildData || !guildData.reddit.includes(username)) {
            return interaction.reply({ content: `❌ Akun Reddit **${username}** tidak ditemukan dalam pairing server ini.`, ephemeral: true });
        }

        // Hapus dari DB
        db.get('servers')
            .find({ id: guildId })
            .get('reddit')
            .remove(u => u.toLowerCase() === username.toLowerCase())
            .write();

        await interaction.reply({ content: `✅ Akun Reddit **${username}** berhasil dihapus dari pairing.`, ephemeral: false });
    }
};
