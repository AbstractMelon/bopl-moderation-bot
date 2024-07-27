const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 't',
    description: 'Times out a user',
    execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('You do not have permissions to timeout members.');
        }

        let user;
        if (message.reference) {
            const referencedMessage = message.channel.messages.cache.get(message.reference.messageId);
            if (referencedMessage) {
                user = referencedMessage.author;
            }
        } else {
            user = message.mentions.users.first();
        }

        if (user) {
            const member = message.guild.members.cache.get(user.id);
            const duration = parseInt(args[0]) || 10;
            const timeout = duration * 60 * 1000;

            member.timeout(timeout).then(() => {
                message.reply(`${user.tag} has been timed out for ${duration} minutes.`);
            }).catch(err => {
                message.reply('I was unable to timeout the member.');
                console.error(err);
            });
        } else {
            message.reply('You need to mention a user or reply to their message.');
        }
    },
};
