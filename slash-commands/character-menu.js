/// @proj.slash : character-menu.js

const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('character-menu')
        .setDescription('Displays a menu with character management options.'),

    async execute(interaction) {
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('character_menu')
            .setPlaceholder('Select an option...')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('New UCP')
                    .setValue('new_ucp')
                    .setDescription('Create a new UCP'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('New UCP Code')
                    .setValue('new_ucp_code')
                    .setDescription('Generate a new UCP code'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('New Password')
                    .setValue('new_password')
                    .setDescription('Create a new password'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Delete Character')
                    .setValue('delete_character')
                    .setDescription('Permanently delete a character')
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
            content: 'Please select an option from the menu below:',
            components: [row]
        });

        console.log(`[LOG] ${interaction.user.tag} used /character-menu in #${interaction.channel.name}`);
    }
};
