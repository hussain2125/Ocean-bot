# Ocean-bot

A Discord bot built with Discord.js v14

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
   - Copy `.env.example` to `.env`
   - Fill in your bot token and IDs

3. Register slash commands:
```bash
npm run register
```

4. Start the bot:
```bash
npm start
```

## Development

Use nodemon for auto-restart during development:
```bash
npm run dev
```

## Commands

### Prefix Commands (!)
- `!ping` - Check bot latency
- `!help` - Show help message

### Slash Commands (/)
- `/ping` - Check bot latency
- `/user [target]` - Get user information

## Project Structure

```
Ocean-bot/
├── src/
│   ├── commands/
│   │   ├── slash/
│   │   └── prefix/
│   ├── events/
│   ├── utils/
│   │   └── register-commands.js
│   └── config/
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```
