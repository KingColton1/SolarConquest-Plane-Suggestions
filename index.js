const { Client, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios'); // For REST API requests
let SummarizerManager = require("node-summarizer").SummarizerManager;
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TARGET_BOT_ID = process.env.TARGET_BOT_ID;
const UPVOTE_EMOJI = process.env.UPVOTE_EMOJI;
const UPVOTE_THRESHOLD = process.env.UPVOTE_THRESHOLD;
const SUGGESTIONS_CHANNEL_ID = process.env.SUGGESTIONS_CHANNEL_ID;

client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const suggestionsChannel = await client.channels.fetch(SUGGESTIONS_CHANNEL_ID);
    if (!suggestionsChannel.isTextBased()) {
        console.error('The specified suggestions channel is not a text channel.');
        return;
    }

    console.log(`Scanning existing messages in #${suggestionsChannel.name}...`);
    let messages = await suggestionsChannel.messages.fetch({ limit: 100 });

    for (const message of messages.values()) {
        if (message.author.id === TARGET_BOT_ID && message.embeds.length) {
            await processMessageForUpvotes(message);
        }
    }
    console.log('Finished scanning existing messages.');
});

client.on(Events.MessageCreate, async (message) => {
    // Only process messages from the specified channel and the target bot
    if (message.channel.id !== SUGGESTIONS_CHANNEL_ID || message.author.id !== TARGET_BOT_ID) return;
    await processMessageForUpvotes(message);
});

async function processMessageForUpvotes(message) {
    const embed = message.embeds[0];
    if (!embed || !embed.description) return;

    const upvoteReaction = message.reactions.cache.get(UPVOTE_EMOJI);
    if (upvoteReaction) {
        const upvoteUsers = await upvoteReaction.users.fetch();
        
        console.log(upvoteUsers.size)
        if (upvoteUsers.size >= UPVOTE_THRESHOLD) {
            
            // Need to work on the summary for name, figuring out a best way to summarize. Maybe with the help from AI to summarize for name?
            let summarizeTitle = new SummarizerManager(embed.description,1);
            let summary = summarizeTitle.getSummaryByFrequency().summary
            const postData = {
                name: summary,
                description_html: `${embed.description}\n\n${upvoteUsers.size} upvoted this suggestion`
            };

            try {
                const response = await axios.post(process.env.API_ENDPOINT, postData, {
                    headers: {
                        'x-api-key': process.env.API_TOKEN,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    console.log(`Successfully posted to API: ${embed.title}`);
                }
            } catch (error) {
                console.error(`Failed to post to API: ${error.message}`);
            }
        }
    }
    else {
        console.log("Failed");
    }
}

client.login(process.env.DISCORD_TOKEN);