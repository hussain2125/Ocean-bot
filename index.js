// Ocean Bot - Main Entry Point
const client = require('./src/config/client');
const config = require('./src/config/config');
const { loadCommands } = require('./src/utils/commandHandler');
const { loadEvents } = require('./src/utils/eventHandler');

// Load all commands and events
console.log('🚀 Starting Ocean Bot...');
console.log('📁 Loading commands...');
loadCommands(client);

console.log('🎪 Loading events...');
loadEvents(client);

// Error handling
process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('❌ Uncaught exception:', error);
    process.exit(1);
});

// Login to Discord
console.log('🔐 Logging in to Discord...');
client.login(config.token);
