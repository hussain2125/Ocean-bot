const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Get information about a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to get information about')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        
        const userEmbed = new EmbedBuilder()
            .setTitle(`👤 ${user.username}'s Information`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Joined Server', value: member.joinedAt.toDateString(), inline: true },
                { name: 'Account Created', value: user.createdAt.toDateString(), inline: true }
            )
            .setColor('#0099ff')
            .setTimestamp();
            
        await interaction.reply({ embeds: [userEmbed] });
    }
};
