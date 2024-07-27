const { PermissionsBitField } = require('discord.js');

module.exports = (client) => {
    client.on('messageCreate', message => {
        const allowedChannels = ['1253486254738112562'];

        if (message.author.bot) return;

        if (!message.channel.isThread()) return;

        if (!allowedChannels.includes(message.channel.parentId)) return;

        if (message.reference) return;

        const keywords = [
            "bots to play against",
            "in-game chat",
            "map editor",
            "map creator",
            "configs for matches",
            "cooldown length modifier",
            "toggle for falling abilities",
            "toggle for platforms falling",
            "map selection",
            "more demo abilities",
            "add crossplay",
            "multiple local players in an online game",
            "make the game free",
            "ports to other platforms",
            "choosing abilities",
            "random ability",
            "modding",
            "more ability slots",
            "gun game",
            "emotes",
            "chat",
            "keybind presets",
            "c4",
            "remote explosives",
            "invulnerability",
            "immunity",
            "parry",
            "shield",
            "mirror",
            "self destruct",
            "portals",
            "swap ray",
            "trampoline",
            "flight",
            "airstrike",
            "cloning",
            "tether",
            "stun",
            "drill breaking rock",
            "drill creating holes",
            "boomerang",
            "emp",
            "molotov",
            "sword",
            "time rewind",
            "memes channel"
        ];

        const title = message.channel.name.toLowerCase();
        const content = message.content.toLowerCase();

        for (const keyword of keywords) {
            if (content.includes(keyword.toLowerCase()) || title.includes(keyword.toLowerCase())) {
                const replyMessage = `It looks like your suggestion might fall under one of the frequently discussed topics. Have you read the Read Before Posting guidelines? Please check it out before posting further. Thanks!

**Read Before Posting Guidelines**

Have you read before posting?

**Before you suggest something:**
- The game is meant to be fun. Losing control of your player, being suddenly slowed down, or unable to use your abilities typically isn’t fun. Think about what you’re suggesting before sending it.
- Search for existing suggestions related to your idea. You may find something similar that has already been posted that you can add on to instead of making a duplicate.

You can read the full guidelines and more detailed information on the <[Read Before Posting page](https://github.com/Mangochicken13/Bopl-Battle-Resources/wiki/Suggestions-‐-Read-Before-Posting)> or on the [Read Before Posting Thread](https://discord.com/channels/1091369043488936028/1189076197435506688).

Thanks for your cooperation!
`;
                message.reply(replyMessage);
                break;
            }
        }
    });
};
