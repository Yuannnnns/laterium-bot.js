/// @proj.slash : random.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Replies with a random cat or dog image/gif!')
        .addStringOption(option =>
            option.setName('animal')
                .setDescription('Choose between cat or dog')
                .setRequired(true)
                .addChoices(
                    { name: 'Cat', value: 'cat' },
                    { name: 'Dog', value: 'dog' }
                )),
    async execute(interaction) {
        const animal = interaction.options.getString('animal');
      
        let url;
        if (animal === 'cat') {
            url = 'https://api.thecatapi.com/v1/images/search'; // Cat API
        } else {
            url = 'https://dog.ceo/api/breeds/image/random'; // Dog API
        }

        try {
            const response = await axios.get(url);
            let imageUrl;
            if (animal === 'cat') {
                imageUrl = response.data[0].url;
            } else {
                imageUrl = response.data.message;
            }
          
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Here's a random ${animal} for you!`)
                .setImage(imageUrl)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Sorry, something went wrong while fetching the image.');
        }
    },
};
