module.exports = {
    name: 'joke',
    description: 'Get a random programming joke',
    execute(message, args) {
        const jokes = [
            "Why don't programmers like nature? It has too many bugs! 🐛",
            "How many programmers does it take to change a light bulb? None – that's a hardware problem! 💡", 
            "Why do Java developers wear glasses? Because they can't C# ! 👓",
            "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        message.reply(randomJoke);
    }
};
