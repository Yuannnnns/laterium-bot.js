/// @proj : app.ts

import { Client } from 'discord.js';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

import { Erine, GatewayIntentBits } from 'erine';

const _prefix = process.env.PREFIX || '!';

const client = new Erine({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    prefix: _prefix
});

client.once('ready', () => {
  console.log(`(ts) Logged in as ${client.user?.tag}` .blue);
});

const token = process.env.TOKEN;
if (!token) {
    console.error('TOKEN is not defined in the environment variables.');
    process.exit(1);
}

client.login(token);
