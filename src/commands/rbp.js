module.exports = {
    name: 'rbp',
    description: 'Sends a link to the RBP',
    execute(message, args) {
        const replyMessage = `It looks like your suggestion might fall under one of the frequently discussed topics. Have you read the Read Before Posting guidelines? Please check it out before posting further. Thanks!

        **Read Before Posting Guidelines**
        
        Have you read before posting?
        
        **Before you suggest something:**
        - The game is meant to be fun. Losing control of your player, being suddenly slowed down, or unable to use your abilities typically isn’t fun. Think about what you’re suggesting before sending it.
        - Search for existing suggestions related to your idea. You may find something similar that has already been posted that you can add on to instead of making a duplicate.
        
        You can read the full guidelines and more detailed information on the [Read Before Posting page](https://github.com/Mangochicken13/Bopl-Battle-Resources/wiki/Suggestions-‐-Read-Before-Posting).
        
        Thanks for your cooperation!
        `;
        message.reply(replyMessage);
    },
};
