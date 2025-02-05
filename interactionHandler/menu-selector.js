/// @proj.interaction : character-menu.js

module.exports = async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === '_tests') {
        const c_inter = interaction.values[0];
        let replyMessage = '';

        switch (c_inter) {
            case 'Value 1':
                replyMessage = 'You selected **Label 1**.';
                break;
            case 'Value 2':
                replyMessage = 'You selected **Label 2**.';
                break;
            case 'Value 3':
                replyMessage = 'You selected **Label 3**.';
                break;
            default:
                replyMessage = 'Unknown selection.';
        }

        await interaction.reply({ content: replyMessage, ephemeral: true });
    }
};
