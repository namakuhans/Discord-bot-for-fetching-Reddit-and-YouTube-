// index.js
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

// Client init
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,           // Untuk slash command
        GatewayIntentBits.GuildMessages,    // Untuk kirim pesan
        GatewayIntentBits.MessageContent    // Untuk baca konten pesan
    ]
});

client.commands = new Collection();

// Load Commands
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
}

// Load Events
const eventsPath = path.join(__dirname, 'src', 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Load Features (RPC, dll)
const featuresPath = path.join(__dirname, 'src', 'features');
if (fs.existsSync(featuresPath)) {
    const featureFiles = fs.readdirSync(featuresPath).filter(file => file.endsWith('.js'));
    for (const file of featureFiles) {
        require(path.join(featuresPath, file))(client);
    }
}

// Load Services (Background Checker)
const servicesPath = path.join(__dirname, 'src', 'services');
if (fs.existsSync(servicesPath)) {
    const serviceFiles = fs.readdirSync(servicesPath).filter(file => file.endsWith('.js'));
    for (const file of serviceFiles) {
        require(path.join(servicesPath, file))(client);
    }
}

// Login bot
client.login(config.token);
