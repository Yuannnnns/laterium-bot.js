/// @proj.slash : kick.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for kicking the user')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        if (user) {
            const member = await interaction.guild.members.fetch(user.id);
            try {
                await member.kick(reason);
                await interaction.reply(`${user.tag} has been kicked. Reason: ${reason}`);
            } catch (error) {
                await interaction.reply('I was unable to kick the user.');
            }
        }
    },
};
