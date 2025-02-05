/// @proj.slash : avatar.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays your avatar!'),
    async execute(interaction) {
        const avatarEmbed = {
            color: 0x0099FF,
            title: `${interaction.user.username}'s Avatar`,
            image: {
                url: interaction.user.displayAvatarURL({ dynamic: true, size: 512 }),
            },
            timestamp: new Date(),
        };
        
        await interaction.reply({ embeds: [avatarEmbed] });
    },
};
