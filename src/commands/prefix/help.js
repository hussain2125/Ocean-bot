const { EmbedBuilder } = require('discord.js');
const config = require('../../config/config');

module.exports = {
    name: 'help',
    description: 'Show all available commands',
    execute(message, args) {
        const helpEmbed = new EmbedBuilder()
            .setTitle('🤖 Bot Commands')
            .setDescription('Here are all available commands:')
            .addFields(
                { name: '📌 Prefix Commands', value: `\`${config.prefix}ping\` - Check bot latency\n\`${config.prefix}help\` - Show this message\n\`${config.prefix}joke\` - Get a random programming joke`, inline: false },
                { name: '⚡ Slash Commands', value: '`/ping` - Check bot latency\n`/user` - Get user info', inline: false }
            )
            .setColor('#0099ff')
            .setFooter({ text: 'More commands coming soon!' })
            .setTimestamp();
        message.reply({ embeds: [helpEmbed] });
    }
};
