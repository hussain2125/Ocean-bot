const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Check bot latency',
    execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .addFields(
                { name: 'Latency', value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
                { name: 'API Latency', value: `${Math.round(message.client.ws.ping)}ms`, inline: true }
            )
            .setColor('#00ff00')
            .setTimestamp();
        message.reply({ embeds: [embed] });
    }
};
