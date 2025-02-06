/// @modal : Events.InteractionCreate

const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`Command ${interaction.commandName} not found.`);
                return;
            }

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(`Error executing command ${interaction.commandName}:`, error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        }

        else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);

            if (!button) {
                console.error(`Button ${interaction.customId} not found.`);
                return;
            }

            try {
                await button.execute(interaction, client);
            } catch (error) {
                console.error(`Error executing button ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'There was an error while handling this button!',
                    ephemeral: true,
                });
            }
        }

        else if (interaction.isStringSelectMenu()) {
            const selectMenu = client.selectMenus.get(interaction.customId);

            //if (!selectMenu) {
            //    console.error(`Select menu ${interaction.customId} not found.`);
            //    return;
            //}

            try {
                await selectMenu.execute(interaction, client);
            } catch (error) {
                console.error(`Error executing select menu ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'There was an error while handling this select menu!',
                    ephemeral: true,
                });
            }
        }

        else if (interaction.isModalSubmit()) {
            const modal = client.modals.get(interaction.customId);

            if (!modal) {
                console.error(`Modal ${interaction.customId} not found.`);
                return;
            }

            try {
                await modal.execute(interaction, client);
            } catch (error) {
                console.error(`Error executing modal ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'There was an error while handling this modal!',
                    ephemeral: true,
                });
            }
        }
    },
};
