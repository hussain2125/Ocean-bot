require('dotenv').config();
const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');

// Create client with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Collections for commands
client.commands = new Collection();

// Bot ready event
client.once('ready', () => {
    console.log(`🤖 Ready! Logged in as ${client.user.tag}`);
    console.log(`📊 Bot is in ${client.guilds.cache.size} guilds`);
    
    // Set bot status
    client.user.setActivity('!help | Slash commands', { type: 'LISTENING' });
});

// Message event handler (for prefix commands)
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    const prefix = process.env.PREFIX || '!';
    
    // Handle mentions
    if (message.mentions.has(client.user)) {
        const embed = new EmbedBuilder()
            .setTitle('👋 Hello!')
            .setDescription(`My prefix is \`${prefix}\` \nUse \`${prefix}help\` to see all commands!`)
            .setColor('#0099ff')
            .setThumbnail(client.user.displayAvatarURL());
        return message.reply({ embeds: [embed] });
    }
    
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    // Basic commands
    switch (commandName) {
        case 'ping':
            const embed = new EmbedBuilder()
                .setTitle('🏓 Pong!')
                .addFields(
                    { name: 'Latency', value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
                    { name: 'API Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true }
                )
                .setColor('#00ff00')
                .setTimestamp();
            message.reply({ embeds: [embed] });
            break;
            
        case 'help':
            const helpEmbed = new EmbedBuilder()
                .setTitle('🤖 Bot Commands')
                .setDescription('Here are all available commands:')
                .addFields(
                    { name: '📌 Prefix Commands', value: `\`${prefix}ping\` - Check bot latency\n\`${prefix}help\` - Show this message`, inline: false },
                    { name: '⚡ Slash Commands', value: '`/ping` - Check bot latency\n`/user` - Get user info', inline: false }
                )
                .setColor('#0099ff')
                .setFooter({ text: 'More commands coming soon!' })
                .setTimestamp();
            message.reply({ embeds: [helpEmbed] });
            break;
        
        case 'joke':
            const jokes = [
                "Why don't programmers like nature? It has too many bugs! 🐛",
                "How many programmers does it take to change a light bulb? None – that's a hardware problem! 💡", 
                "Why do Java developers wear glasses? Because they can't C# ! 👓",
                "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺"
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            message.reply(randomJoke);
            break;
    }   
});

// Slash command handler
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    const { commandName } = interaction;
    
    switch (commandName) {
        case 'ping':
            const embed = new EmbedBuilder()
                .setTitle('🏓 Pong!')
                .addFields(
                    { name: 'API Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true }
                )
                .setColor('#00ff00')
                .setTimestamp();
            await interaction.reply({ embeds: [embed] });
            break;
            
        case 'user':
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
            break;
    }
});

// Error handling
process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);