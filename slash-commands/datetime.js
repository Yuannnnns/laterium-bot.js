/// @proj.slash : datetime.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('datetime')
        .setDescription('Shows the current date and time.'),
    async execute(interaction) {
        const currentDate = new Date();

        const dateEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Current Date and Time')
            .addFields(
                { name: 'Date', value: currentDate.toLocaleDateString(), inline: true },
                { name: 'Time', value: currentDate.toLocaleTimeString(), inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [dateEmbed] });
    },
};
