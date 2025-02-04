/// @proj.slash : blocked.js

const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const connection = require('../mysql');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-blocked')
        .setDescription('Add a channel to the blocked list.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Select the channel to block')
                .setRequired(true)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true,
            });
        }

        const guildId = interaction.guild.id;
        const channelId = interaction.options.getChannel('channel').id;

        const query = 'INSERT INTO blocked_channels (guild_id, channel_id) VALUES (?, ?)';

        connection.query(query, [guildId, channelId], (err, results) => {
            if (err) {
                console.error('Error inserting into database:', err);
                return interaction.reply({ content: 'There was an error adding the channel to the blocked list.', ephemeral: true });
            }

            interaction.reply({
                content: `Channel with ID ${channelId} has been added to the blocked list for guild with ID ${guildId}.`,
                ephemeral: true,
            });
        });
    },
};
