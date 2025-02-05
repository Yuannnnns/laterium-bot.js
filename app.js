/// @proj : app.js

require('dotenv').config();
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const connection = require('./mysql');
const colors = require('colors');

require('ts-node/register');
require('./typescript/app.ts');

const { Erine, GatewayIntentBits } = require("erine");

const _prefix = process.env.PREFIX || '!';

const app = new Erine({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    prefix: _prefix
});

module.exports = app;

/// @System : Auto Save Role
app.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (!oldMember) {
        try {
            oldMember = await newMember.guild.members.fetch(newMember.id);
        } catch (err) {
            console.error("Failed to fetch old member:", err);
            return;
        }
    }

    const newRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

    newRoles.each(role => {
        const userId = newMember.id;
        const roleId = role.id;

        const query = 'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE role_id = ?';
        connection.query(query, [userId, roleId, roleId], (err, results) => {
            if (err) {
                console.error(`Error saving role ${role.name} for user ${newMember.user.tag}:`, err);
                return;
            }
            console.log(`Role ${role.name} saved for user ${newMember.user.tag}`);
        });
    });

    removedRoles.each(role => {
        const userId = newMember.id;
        const roleId = role.id;

        const query = 'DELETE FROM user_roles WHERE user_id = ? AND role_id = ?';
        connection.query(query, [userId, roleId], (err, results) => {
            if (err) {
                console.error(`Error removing role ${role.name} for user ${newMember.user.tag}:`, err);
                return;
            }
            console.log(`Role ${role.name} removed for user ${newMember.user.tag}`);
        });
    });
});

app.on('guildMemberAdd', (member) => {
    const userId = member.id;

    const query = 'SELECT role_id FROM user_roles WHERE user_id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) throw err;

        results.forEach(row => {
            const role = member.guild.roles.cache.get(row.role_id);
            if (role) {
                member.roles.add(role)
                    .then(() => console.log(`Restored role ${role.name} for user ${member.user.tag}`))
                    .catch(console.error);
            }
        });
    });
});

const token = process.env.TOKEN;
const config = require('./config.json');

const eventsPath = path.join(__dirname, 'events'); // @path : events
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

app.commands = new Collection();
app.buttons = new Collection();
app.selectMenus = new Collection();
app.modals = new Collection();

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        app.once(event.name, (...args) => event.execute(...args, app));
    } else {
        app.on(event.name, (...args) => event.execute(...args, app));
    }
}

const commandsPath = path.join(__dirname, 'slash-commands'); // @path : slash-commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    app.commands.set(command.data.name, command);
}

const mysqlPath = path.join(__dirname, 'mysql'); // @path : mysql
const mysqlFiles = fs.readdirSync(mysqlPath).filter(file => file.endsWith('.js'));

for (const file of mysqlFiles) {
    const filePath = path.join(mysqlPath, file);
    const queryModule = require(filePath);
    console.log(`(js) Loaded MySQL query file: ${file}` .yellow);
}

const componentsPath = path.join(__dirname, 'components'); // @path : components
const componentFiles = fs.readdirSync(componentsPath).filter(file => file.endsWith('.js'));

for (const file of componentFiles) {
    const filePath = path.join(componentsPath, file);
    const component = require(filePath);
    console.log(`(js) Loaded component file: ${file}` .yellow);
}

const sampQueryPath = path.join(__dirname, 'samp-query'); // @path : samp-query
const sampQueryFiles = fs.readdirSync(sampQueryPath).filter(file => file.endsWith('.js'));

for (const file of sampQueryFiles) {
    const filePath = path.join(sampQueryPath, file);
    const component = require(filePath);
    console.log(`(js) Loaded samp-query file: ${file}` .yellow);
}

/// @system : Character Menu
const interactionPath = path.join(__dirname, 'interactionHandler'); // @path : interactionHandler

const interactionFiles = fs.readdirSync(interactionPath).filter(file => file.endsWith('.js'));

for (const file of interactionFiles) {
    const filePath = path.join(interactionPath, file);
    const interactionModule = require(filePath);
    console.log(`(js) Loaded interaction file: ${file}` .yellow);
}

app.on('interactionCreate', async (interaction) => {
    for (const file of interactionFiles) {
        const filePath = path.join(interactionPath, file);
        const interactionHandler = require(filePath);
        await interactionHandler(interaction);
    }
});

/// @System : Timeout New Member's
const TIMEOUT_DURATION = 8 * 60 * 1000; // 8-minutes

app.on('guildMemberAdd', async (member) => {
    try {
        await member.timeout(TIMEOUT_DURATION, 'New member timeout');
        console.log(`Member ${member.user.tag} has been timed out for 8 minutes.`);
    } catch (error) {
        console.error('Failed to timeout member:', error);
    }
});

/// @system : Block Messages
const getBlockedChannels = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT channel_id FROM blocked_channels', (err, results) => {
      if (err) {
        console.error('Error fetching blocked channels:', err);
        reject(err);
      } else {
        const blockedChannels = results.map(row => row.channel_id);
        resolve(blockedChannels);
      }
    });
  });
};

app.on('messageCreate', message => {
    getBlockedChannels((blockedChannelsWregex) => {
        const containsBadWord = config.badWords.some(word => message.content.toLowerCase().includes(word));

        if (containsBadWord) {
            message.delete().catch(console.error);
        }

        if (blockedChannelsWregex.includes(message.channel.id)) {
            const containsBlockedThis = config.blockedWregex.some(url => {
                const urlPattern = new RegExp(url + '\\S+', 'i');
                return urlPattern.test(message.content);
            });

            if (containsBlockedThis) {
                message.delete().catch(console.error);
            }
        }

        if (!message.content.startsWith(_prefix) || message.author.bot) return;

        const args = message.content.slice(_prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    });
});

app.once('ready', () => {
    console.log(`(js) Logged in as ${app.user.tag}` .yellow);
});

if (!token) {
    console.error('TOKEN is not defined in the environment variables.' .red);
    process.exit(1);
}

app.login(token);
