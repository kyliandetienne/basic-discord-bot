const fs = require('fs');
const path = require('path');
require('colors');

module.exports = async (client) => {
    client.once('ready', async () => {
        const slashCommandsDir = path.join(__dirname, '../SlashCommands');

        fs.readdirSync(slashCommandsDir).filter(file => file.endsWith('.js')).forEach(async (file) => {
            try {
                const command = require(path.join(slashCommandsDir, file));

                if (!command.data || !command.data.name || typeof command.data.name !== "string") {
                    throw new TypeError(`The slash command ${file.slice(0, file.length - 3)} does not have a valid name!`.red);
                }

                if (!command.execute || typeof command.execute !== "function") {
                    throw new TypeError(`The slash command ${file.slice(0, file.length - 3)} does not have an execute function!`.red);
                }

                client.slashcommands.set(command.data.name, command);
                console.log(`The slash command ${file} got loaded with success!`.green);

                const guild = client.guilds.cache.get(client.config.guildId);
                if (guild && guild.commands) {
                    await guild.commands.create(command.data);
                } else {
                    console.error(`The guild with ID ${client.config.guildId} does not exist or does not have a commands property.`.red);
                }
            } catch (error) {
                console.error(`An error occurred while loading the slash command: ${error}`.red);
            }
        });
    });
}