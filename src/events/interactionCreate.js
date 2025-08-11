// src/events/interactionCreate.js
const fs = require('fs');
const path = require('path');

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

    const commandName = interaction.commandName;
    const commandPath = path.join(__dirname, `../commands/${commandName}.js`);

    if (!fs.existsSync(commandPath)) {
        return interaction.reply({ content: '❌ Perintah tidak ditemukan.', ephemeral: true });
    }

    try {
        const command = require(commandPath);
        await command.execute(client, interaction);
    } catch (error) {
        console.error(`[interactionCreate] Error saat menjalankan ${commandName}:`, error);
        await interaction.reply({ content: '❌ Terjadi kesalahan saat menjalankan perintah.', ephemeral: true });
    }
};
