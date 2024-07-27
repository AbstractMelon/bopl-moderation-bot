const fs = require('fs');

module.exports = (client) => {
    client.on('messageCreate', message => {
        // console.log("Message received: ", message);

        if (!message.content || message.author.bot) {
            return;
        }

        console.log(`Message content: "${message.content}" from ${message.author.tag}`);

        // Check if the message is from a bot or does not start with '!'
        if (!message.content || message.author.bot || !message.content.startsWith('!')) {
            return;
        }

        console.log("Command detected!");

        const args = message.content.slice(1).split(/ +/);
        const commandName = args.shift().toLowerCase();

        console.log(`Command name: ${commandName}, Args: ${args}`);

        const command = client.commands.get(commandName);

        if (!command) {
            console.log(`No command found for: ${commandName}`);
            return;
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing that command.');
        }
    });
};
