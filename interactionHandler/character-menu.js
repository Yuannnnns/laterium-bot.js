/// @proj.interaction : character-menu.js

module.exports = async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'character_menu') {
        const c_inter = interaction.values[0];

        if (c_inter === 'new_ucp') {
            await interaction.reply({ content: 'You selected **New UCP**.', ephemeral: true });
        } else if (c_inter === 'new_ucp_code') {
            await interaction.reply({ content: 'You selected **New UCP Code**.', ephemeral: true });
        } else if (c_inter === 'new_password') {
            await interaction.reply({ content: 'You selected **New Password**.', ephemeral: true });
        } else if (c_inter === 'delete_character') {
            await interaction.reply({ content: 'You selected **Delete Character**.', ephemeral: true });
        }

        console.log(`[LOG INTER] ${interaction.user.tag} selected ${c_inter} in #${interaction.channel.name}`);
    }
};
