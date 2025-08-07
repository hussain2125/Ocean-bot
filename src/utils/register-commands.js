require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong and latency info!'),
        
    new SlashCommandBuilder()
        .setName('user')
        .setDescription('Get user information')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to get info about')
                .setRequired(false)
        ),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`🔄 Started refreshing ${commands.length} application (/) commands.`);

        // Register commands globally (takes 1 hour to update)
        // For instant updates in development, use guild-specific registration
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
})();