const { EmbedBuilder } = require('discord.js');
const config = require('../config/config');

module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (message.author.bot) return;
        
        const client = message.client;
        
        // Handle mentions
        if (message.mentions.has(client.user)) {
            const embed = new EmbedBuilder()
                .setTitle('👋 Hello!')
                .setDescription(`My prefix is \`${config.prefix}\` \nUse \`${config.prefix}help\` to see all commands!`)
                .setColor('#0099ff')
                .setThumbnail(client.user.displayAvatarURL());
            return message.reply({ embeds: [embed] });
        }
        
        if (!message.content.startsWith(config.prefix)) return;
        
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        const command = client.prefixCommands.get(commandName);
        
        if (!command) return;
        
        try {
            command.execute(message, args);
        } catch (error) {
            console.error('❌ Error executing command:', error);
            message.reply('❌ There was an error executing this command!');
        }
    }
};
