const { REST, Routes } = require('discord.js');
const config = require('../config/config');

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('🧹 Starting to clear all slash commands...');
        
        // Get guild name for better feedback
        const guild = await rest.get(Routes.guild(config.guildId));
        console.log(`🏠 Target Guild: ${guild.name} (ID: ${config.guildId})`);
        
        // Clear guild-specific commands
        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: [] },
        );
        
        console.log(`✅ Successfully cleared all slash commands from "${guild.name}"`);
        console.log('⚡ Commands have been removed instantly from that Discord server!');
        
        // Also clear global commands (just in case)
        console.log('\n🌍 Clearing global commands...');
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: [] },
        );
        console.log('✅ Global commands cleared as well!');
        
    } catch (error) {
        console.error('❌ Error clearing commands:', error);
        if (error.code === 10004) {
            console.error('🚨 Guild not found! Make sure your GUILD_ID is correct in .env file.');
        } else if (error.code === 50001) {
            console.error('🚨 Missing access! Make sure your bot is in the target guild.');
        }
    }
})();
