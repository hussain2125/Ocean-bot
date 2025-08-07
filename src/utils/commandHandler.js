const fs = require('fs');
const path = require('path');

function loadCommands(client) {
    // Load slash commands
    const slashCommandsPath = path.join(__dirname, '..', 'commands', 'slash');
    const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

    for (const file of slashCommandFiles) {
        const filePath = path.join(slashCommandsPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`✅ Loaded slash command: ${command.data.name}`);
        } else {
            console.log(`⚠️ [WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

    // Load prefix commands
    const prefixCommandsPath = path.join(__dirname, '..', 'commands', 'prefix');
    const prefixCommandFiles = fs.readdirSync(prefixCommandsPath).filter(file => file.endsWith('.js'));

    for (const file of prefixCommandFiles) {
        const filePath = path.join(prefixCommandsPath, file);
        const command = require(filePath);
        
        if ('name' in command && 'execute' in command) {
            client.prefixCommands.set(command.name, command);
            console.log(`✅ Loaded prefix command: ${command.name}`);
        } else {
            console.log(`⚠️ [WARNING] The command at ${filePath} is missing a required "name" or "execute" property.`);
        }
    }
}

module.exports = { loadCommands };
