/// @proj.slash : urban.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Searches for a definition on Urban Dictionary')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('The term to search for')
                .setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`;

        try {
            const response = await axios.get(url);
            const list = response.data.list;
            
            if (list.length === 0) {
                return await interaction.reply({ content: `❌ No definition found for **${query}**.`, ephemeral: true });
            }
            
            const definition = list[0].definition;
            const example = list[0].example || 'No example available.';

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Urban Dictionary: ${query}`)
                .setDescription(definition.length > 1024 ? definition.substring(0, 1020) + '...' : definition)
                .addFields({ name: 'Example', value: example.length > 1024 ? example.substring(0, 1020) + '...' : example })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Failed to fetch data from Urban Dictionary.', ephemeral: true });
        }
    },
};
