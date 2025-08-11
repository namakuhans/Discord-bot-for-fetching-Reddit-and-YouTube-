const { SlashCommandBuilder, ChannelType } = require('discord.js');
const db = require('../utils/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setyoutubechannel')
        .setDescription('Atur channel notifikasi untuk video YouTube')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Pilih channel untuk notifikasi YouTube')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const guildId = interaction.guild.id;

        // Ambil atau buat data server
        let guildData = db.get('servers').find({ id: guildId }).value();
        if (!guildData) {
            db.get('servers').push({ id: guildId, reddit: [], youtube: [], redditChannel: null, youtubeChannel: null }).write();
            guildData = db.get('servers').find({ id: guildId }).value();
        }

        // Simpan channel
        db.get('servers')
            .find({ id: guildId })
            .set('youtubeChannel', channel.id)
            .write();

        await interaction.reply({ content: `✅ Channel notifikasi YouTube diatur ke ${channel}`, ephemeral: false });
    }
};
