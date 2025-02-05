/// @proj.slash : character-menu.js

const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tests-menu')
        .setDescription('.'),

    async execute(interaction) {
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('_tests')
            .setPlaceholder('Select an option...')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Label 1')
                    .setValue('Value 1')
                    .setDescription('Description 1'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Label 2')
                    .setValue('Value 2')
                    .setDescription('Description 2'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Label 3')
                    .setValue('Value 3')
                    .setDescription('Description 3')
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
            content: 'Please select an option from the menu below:',
            components: [row]
        });
    }
};
