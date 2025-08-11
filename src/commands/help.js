// src/commands/help.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lihat daftar command dan fungsinya'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('📜 Daftar Command Bot')
            .setColor(0x00AE86)
            .setDescription('Berikut daftar command yang bisa kamu gunakan:')
            .addFields(
                { name: '/pairreddit <username>', value: 'Pair akun Reddit ke bot untuk memantau postingan terbaru.' },
                { name: '/unpairreddit <username>', value: 'Hapus pairing akun Reddit dari bot.' },
                { name: '/setredditchannel <#channel>', value: 'Atur channel notifikasi untuk postingan Reddit.' },
                { name: '/pairyoutube <url>', value: 'Pair channel YouTube ke bot untuk memantau video terbaru.' },
                { name: '/unpairyoutube <url>', value: 'Hapus pairing channel YouTube dari bot.' },
                { name: '/setyoutubechannel <#channel>', value: 'Atur channel notifikasi untuk video YouTube.' },
                { name: '/help', value: 'Menampilkan pesan bantuan ini.' }
            )
            .setFooter({ text: 'Bot Pair Reddit & YouTube - Dibuat dengan ❤️' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
