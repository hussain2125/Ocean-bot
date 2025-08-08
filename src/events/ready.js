const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`🤖 Ready! Logged in as ${client.user.tag}`);
        console.log(`📊 Bot is in ${client.guilds.cache.size} guilds`);
        
        // Set bot status - Choose one of the options below:
        
        // Option 1: Playing status (🎮 Playing ...)
        client.user.setActivity('with Discord.js', { type: ActivityType.Playing });
        
        // Option 2: Watching status (👀 Watching ...)
        // client.user.setActivity('over the server', { type: ActivityType.Watching });
        
        // Option 3: Listening status (🎧 Listening to ...)
        // client.user.setActivity('!help | Slash commands', { type: ActivityType.Listening });
        
        // Option 4: Streaming status (🟣 Streaming ...)
        // client.user.setActivity('Ocean Bot Live', { type: ActivityType.Streaming, url: 'https://twitch.tv/your_channel' });
        
        // Option 5: Competing status (⚔️ Competing in ...)
        // client.user.setActivity('coding challenges', { type: ActivityType.Competing });
        
        // Option 6: Custom status with online/idle/dnd/invisible presence
        // client.user.setPresence({
        //     activities: [{ name: 'Ocean Bot v1.0', type: ActivityType.Playing }],
        //     status: 'online'  // online, idle, dnd, invisible
        // });
        
        console.log('✅ Bot status set successfully!');
    }
};
