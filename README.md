# Solar Conquest Plane Suggestions

A simple Discord bot that read every message in a suggestion channel from a suggester bot. Depending on the upvote threshold, they will be sent to your Plane.so instance and create an new issue (card) automatically. Developed for Solar Conquest server, a Roblox community server for a Roblox game called Solar Conquest 2. Feel free to fork and modify this bot.

## Requirements

- NodeJS 20 or up.
- A server (Can be a VPS, bare metal server, or other computers. You don't need a high-end server to run this.)
- Have a Plane.so instance or self hosted Plane.so server

If you don't have a server but have a Plane.so instance using their website, use one of Discord bot hosting service like Pebblehost and BisectHosting. They're very inexpensive and this bot does not use database at all.

## How to use .env

.env is a environment variable file, useful to hide sensitive information such as bot token and API token. It is required to use them to run this bot.

### DISCORD_TOKEN

Your discord bot token for a bot to be able to log in as a bot.

### API_ENDPOINT

A API endpoint is a URL of your workspace and project. Your API endpoint should look like this: `https://{your URL}/api/v1/workspaces/{your workspace name}/projects/{your project id}/issues/`. By default, all cards (they're called issues in plane.so's term) are added to a default column (also known as State in plane.so's term). If you don't understand this, please refer to this documentation: <https://developers.plane.so/api-reference/introduction>

### API_TOKEN

Your Plane.so Workspace's API Token (either self hosted or plane.so)

### TARGET_BOT_ID

A Suggester Bot's ID, can be found by right clicki on a suggester bot and copy User ID.

### UPVOTE_EMOJI

A upvote emoji used for the message's reaction. Do note that not all suggester bot use same emoji so be sure you have a right emoji.

### SUGGESTIONS_CHANNEL_ID

A channel for suggestions that are accepted by staff team and is open to anyone to upvote or downvote

### UPVOTE_THRESHOLD

Minimum number of threshold for this bot to copy a upvoted suggestion and send to your Plane.so board
