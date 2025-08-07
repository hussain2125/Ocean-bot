module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`🤖 Ready! Logged in as ${client.user.tag}`);
        console.log(`📊 Bot is in ${client.guilds.cache.size} guilds`);
        
        // Set bot status
        client.user.setActivity('!help | Slash commands', { type: 'LISTENING' });
    }
};
