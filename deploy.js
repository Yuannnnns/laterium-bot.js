/// @proj : deploy.js

require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const colors = require('colors');

const commands = [];
const commandsPath = path.join(__dirname, 'slash-commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const GUILD_IDS = [
    process.env.GUILD_ID_1,
    process.env.GUILD_ID_2,
    process.env.GUILD_ID_3
].filter(Boolean);

(async () => {
    try {
        console.log('Registering slash commands...' .cyan);

        for (const guildId of GUILD_IDS) {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
                { body: commands },
            );

            console.log(`Slash commands registered successfully for guild ${guildId}.` .yellow);
        }

        console.log('All slash commands registered successfully.' .yellow);
    } catch (error) {
        console.error('Failed to register slash commands:' .red, error);
    }
})();
