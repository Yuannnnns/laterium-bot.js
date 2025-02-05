/// @proj.slash : timeout.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Temporarily mutes a user in the server.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to timeout')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Duration of the timeout in seconds')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the timeout')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        
        if (!user) {
            return interaction.reply('Please mention a valid user to timeout.');
        }

        if (duration <= 0) {
            return interaction.reply('Duration must be a positive number.');
        }

        const member = await interaction.guild.members.fetch(user.id);
        const timeoutDuration = duration * 1000;

        try {
            await member.timeout(timeoutDuration, reason);
            
            await interaction.reply(`${user.tag} has been timed out for ${duration} seconds. Reason: ${reason}`);

            const timeoutEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Timeout Applied')
                .setDescription(`${user.tag} has been timed out for ${duration} seconds.\nReason: ${reason}`)
                .setTimestamp();

            await interaction.followUp({ embeds: [timeoutEmbed] });
        } catch (error) {
            await interaction.reply('I was unable to apply the timeout to the user.');
        }
    },
};
