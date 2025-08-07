const { Client, GatewayIntentBits, Collection } = require('discord.js');

// Create client with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Collections for commands
client.commands = new Collection();
client.prefixCommands = new Collection();

module.exports = client;
