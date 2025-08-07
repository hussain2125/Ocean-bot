module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        
        const command = interaction.client.commands.get(interaction.commandName);
        
        if (!command) return;
        
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('❌ Error executing slash command:', error);
            await interaction.reply({ 
                content: '❌ There was an error executing this command!', 
                ephemeral: true 
            });
        }
    }
};
