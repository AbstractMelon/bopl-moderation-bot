const { ForumChannel, EmbedBuilder } = require('discord.js');

// Default reaction amount needed to close a thread
let reactionThreshold = 10;

module.exports = (client) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        console.log(`Reaction added by ${user.tag}: ${reaction.emoji.name} on message ID: ${reaction.message.id}`);

        // Fetch the reaction if it's partial
        if (reaction.partial) {
            try {
                console.log('Fetching partial reaction...');
                await reaction.fetch();
                console.log('Reaction fetched successfully.');
            } catch (error) {
                console.error('Error fetching reaction:', error);
                return;
            }
        }

        const message = reaction.message;
        const { channel } = message;

        console.log(`Reaction is ${reaction.emoji.name} on message in channel: ${channel.name} (ID: ${channel.id})`);

        // Check if the channel is a thread
        if (!channel.isThread()) {
            console.log('Channel is not a thread, skipping...');
            return;
        }

        console.log('Channel is a thread.');

        // Check if the parent channel is a ForumChannel
        if (!(channel.parent instanceof ForumChannel)) {
            console.log('Parent channel is not a ForumChannel, skipping...');
            return;
        }

        console.log('Parent channel is a ForumChannel.');

        // Check if the parent channel is the #suggestions forum channel
        /*
        if (channel.parent.name.toLowerCase() !== 'suggestions') {
            console.log(`Parent channel is not #suggestions (actual: ${channel.parent.name}), skipping...`);
            return;
        }
        */

        console.log(`Parent channel is #suggestions.`);

        // Only run if the reaction is on the first message of the thread (the starting post)
        if (message.id !== channel.id) {
            console.log('Reaction is not on the first message of the thread, skipping...');
            return;
        }

        console.log('Reaction is on the first message of the thread.');

        // Count the number of ❌ reactions and deductibles
        const xReaction = message.reactions.cache.get('❌')?.count || 0;
        const upVoteReaction = message.reactions.cache.get('👍')?.count || 0;
        const checkReaction = message.reactions.cache.get('✅')?.count || 0;
        const eyesReaction = message.reactions.cache.get('👀')?.count || 0;

        const reactionCount = xReaction - (upVoteReaction); // + checkReaction + eyesReaction);
        console.log(`Calculated reaction score: ${reactionCount} (❌: ${xReaction}, 👍: ${upVoteReaction}, ✅: ${checkReaction}, 👀: ${eyesReaction})`);

        // If the post has reached the threshold, close the thread
        if (reactionCount >= reactionThreshold) {
            console.log(`Reaction count is ${reactionCount}, attempting to lock thread...`);
            try {
                await channel.setLocked(true);
                console.log('Thread locked successfully.');

                // Create and send an embed message
                const embed = new EmbedBuilder()
                    .setTitle('Suggestion Closed')
                    .setDescription(`This suggestion has received ${reactionCount} ❌ reactions (after deductibles) and has been closed.`)
                    .setColor(0xff0000) // Red
                    .setTimestamp()
                    .setFooter({ text: 'Bopl Moderation Bot', iconURL: client.user.displayAvatarURL() });

                await channel.send({ embeds: [embed] });
                console.log('Closure embed sent.');
            } catch (error) {
                console.error('Failed to lock the thread or send closure embed:', error);
            }
        } else {
            console.log(`Reaction count is below threshold (${reactionCount}/${reactionThreshold}), thread remains open.`);
        }
    });

    /*
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        if (message.content === '!setreactionamount') {
            const amount = interaction.options.getInteger('amount');
            if (amount && amount > 0) {
                reactionThreshold = amount;
                await interaction.reply(`Reaction threshold set to ${reactionThreshold} ❌ reactions.`);
                console.log(`Reaction threshold updated to ${reactionThreshold}`);
            } else {
                await interaction.reply('Please provide a valid positive integer for the reaction threshold.');
            }
        }
    });
    */
};
