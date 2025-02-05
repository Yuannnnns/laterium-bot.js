/// @proj.slash : monitor.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const samp = require('samp-query');

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

        const serverOptions = { host: ip, port: port };

        samp(serverOptions, async (error, response) => {
            if (error) {
                await interaction.editReply({ content: `❌ Server **${ip}:${port}** is offline or unreachable.`, ephemeral: true });
            } else {
                const statusEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('SA-MP Server Status')
                    .addFields(
                        { name: 'Hostname', value: response.hostname, inline: false },
                        { name: 'Players', value: `${response.online}/${response.maxplayers}`, inline: true },
                        { name: 'Gamemode', value: response.gamemode, inline: true },
                        { name: 'Map', value: response.mapname, inline: true },
                        { name: 'IP & Port', value: `${ip}:${port}`, inline: false }
                    )
                    .setTimestamp();
                
                await interaction.editReply({ embeds: [statusEmbed], ephemeral: true });
            }
        });
    },
};

