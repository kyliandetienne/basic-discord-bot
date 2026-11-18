const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require("../../config.js");
const prefix = config.prefix;

module.exports = {
    name: 'help',
    description: 'Montre toute les commandes disponibles.',
    Permission: 'Aucune',
    Usage: `${prefix}help`,

    async run(bot, message) {
        try {
            // Read all command files from the commands directory
            const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));
            const commands = [];

            // Loop through each file and require it to get the command details
            for (const file of commandFiles) {
                const command = require(path.join(__dirname, `../commands/${file}`));
                commands.push({
                    name: command.name,
                    description: command.description,
                    permission: command.Permission || 'Aucune', // Include permission if available
                });
            }

            // Create an embed to display the commands
            const embed = new EmbedBuilder()
                .setTitle('Liste des commandes')
                .setColor(config.color)
                .setDescription('Voici la liste des commandes disponibles :');

            // Prepare the fields array
            const fields = commands.map(cmd => ({
                name: `${cmd.name}`,
                value: `Description: ${cmd.description}\nPermission: ${cmd.permission}\nUsage: ${cmd.usage}\n`,
                inline: false,
            }));

            // Add fields to the embed
            embed.addFields(fields);

            // Send the embed to the channel
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error in help command:', error);
            message.channel.send('Une erreur est survenue lors de l\'exécution de la commande help.');
        }
    }
}
