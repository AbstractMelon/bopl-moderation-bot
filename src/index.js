const { Client, GatewayIntentBits, Collection, Partials  } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

try {
    dotenv.config();
} catch (error) {
    console.error('Failed to load .env file', error);
}

let client;
try {
    client = new Client({ 
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildMessageReactions
        ],
        partials: [
            Partials.Channel,
            Partials.GuildMember,
            Partials.Message,
            Partials.Reaction,
            Partials.User,
        ]
    });
} catch (error) {
    console.error('Failed to create Discord client', error);
}

client.commands = new Collection();


// Had to make this for some reason?
let commandFiles;
try {
    const commandsPath = path.resolve(__dirname, 'commands');
    if (!fs.existsSync(commandsPath)) {
        fs.mkdirSync(commandsPath);
        console.log(`Created missing 'commands' directory`);
    }
    commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
} catch (error) {
    console.error('Failed to read command files', error);
}

if (commandFiles) {
    for (const file of commandFiles) {
        try {
            const command = require(`./commands/${file}`);
            client.commands.set(command.name, command);
        } catch (error) {
            console.error(`Failed to load command file: ${file}`, error);
        }
    }
}

let eventFiles;
try {
    const eventsPath = path.resolve(__dirname, 'events');
    if (!fs.existsSync(eventsPath)) {
        fs.mkdirSync(eventsPath);
        console.log(`Created missing 'events' directory`);
    }
    eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
} catch (error) {
    console.error('Failed to read event files', error);
}

if (eventFiles) {
    for (const file of eventFiles) {
        try {
            const event = require(`./events/${file}`);
            event(client);
        } catch (error) {
            console.error(`Failed to load event file: ${file}`, error);
        }
    }
}

// Load automod, template is:
// require('./modules/filename')(client); 
try {
    // require('./modules/automod')(client); 
} catch (error) {
    console.error('Failed to load automod module', error);
}

// Start bot
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log("Bot loaded!")
});

try {
    client.login(process.env.DISCORD_TOKEN);
} catch (error) {
    console.error('Failed to login to Discord', error);
}
