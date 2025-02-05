/// @proj.slash : quotes.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Fetches a random quote'),
    async execute(interaction) {
        const url = 'https://api.quotable.io/random';

        try {
            const response = await axios.get(url);
            const quote = response.data;

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Random Quote')
                .setDescription(`"${quote.content}"`)
                .addFields({ name: 'Author', value: quote.author })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Failed to fetch a quote.', ephemeral: true });
        }
    },
};
