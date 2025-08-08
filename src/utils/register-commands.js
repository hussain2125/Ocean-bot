const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

const commands = [];

// Load slash commands from slash commands folder
const slashCommandsPath = path.join(__dirname, '..', 'commands', 'slash');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
    const filePath = path.join(slashCommandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`✅ Registered slash command: ${command.data.name}`);
    } else {
        console.log(`⚠️ [WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log(`\n🔄 Started refreshing ${commands.length} application (/) commands.`);
        
        // Get guild name for better feedback
        const guild = await rest.get(Routes.guild(config.guildId));
        console.log(`🏠 Target Guild: ${guild.name} (ID: ${config.guildId})`);
        
        // Register commands for specific guild (instant updates for development)
        // For global commands, use Routes.applicationCommands(config.clientId)
        const data = await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands },
        );

        console.log(`✅ Successfully reloaded ${data.length} application (/) commands for "${guild.name}"`);
        console.log(`⚡ Commands are now available instantly in that Discord server!`);
    } catch (error) {
        console.error('❌ Error registering commands:', error);
        if (error.code === 10004) {
            console.error('🚨 Guild not found! Make sure your GUILD_ID is correct in .env file.');
        } else if (error.code === 50001) {
            console.error('🚨 Missing access! Make sure your bot is in the target guild.');
        }
    }
})();
