/// @proj.slash : monitor.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Gamedig = require('gamedig');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sampstatus')
        .setDescription('Check SA-MP server status')
        .addStringOption(option => 
            option.setName('ip')
                .setDescription('SA-MP server IP')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('port')
                .setDescription('Server port (optional, default: 7777)')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const ip = interaction.options.getString('ip');
        const port = interaction.options.getInteger('port') || 7777;

        try {
            const state = await Gamedig.query({
                type: 'samp',
                host: ip,
                port: port
            });

            const statusEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('SA-MP Server Status')
                .addFields(
                    { name: 'Hostname', value: state.name, inline: false },
                    { name: 'Players', value: `${state.players.length}/${state.maxplayers}`, inline: true },
                    { name: 'Gamemode', value: state.raw.gamemode, inline: true },
                    { name: 'Map', value: state.map, inline: true },
                    { name: 'IP & Port', value: `${ip}:${port}`, inline: false }
                )
                .setTimestamp();

            await interaction.editReply({ embeds: [statusEmbed], ephemeral: true });

        } catch (error) {
            console.error(`Error querying server ${ip}:${port} - ${error.message}`);
            await interaction.editReply({ content: `❌ Server **${ip}:${port}** is offline or unreachable.`, ephemeral: true });
        }
    },
};

