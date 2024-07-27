const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'b',
    description: 'Bans a user',
    execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('You do not have permissions to ban members.');
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
            member.ban().then(() => {
                message.reply(`${user.tag} has been banned.`);
            }).catch(err => {
                message.reply('I was unable to ban the member.');
                console.error(err);
            });
        } else {
            message.reply('You need to mention a user or reply to their message.');
        }
    },
};
