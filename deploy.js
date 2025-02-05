/// @proj : deploy.js

require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const colors = require('colors');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commands = [];
const commandsPath = path.join(__dirname, 'slash-commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
}

(async () => {
    try {
        console.log('Fetching bot guilds...'.cyan);
        
        const guilds = await rest.get(Routes.userGuilds());

        const guildIds = guilds.map(guild => guild.id);
        console.log(`Found ${guildIds.length} guilds.`.yellow);

        for (const guildId of guildIds) {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
                { body: commands }
            );
            console.log(`Slash commands registered successfully for guild ${guildId}.`.green);
        }

        console.log('All slash commands registered successfully.'.yellow);
    } catch (error) {
        console.error('Failed to register slash commands:'.red, error);
    }
})();
