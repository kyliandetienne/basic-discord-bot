const fs = require('fs');
const path = require('path');
require('colors');

module.exports = async (bot) => {
    const commandsDir = path.join(__dirname, '../commands');

    fs.readdirSync(commandsDir).filter(file => file.endsWith('.js')).forEach(file => {
        try {
            const command = require(path.join(commandsDir, file));
            if (!command.name || typeof command.name !== "string") {
                throw new TypeError(`La commande ${file.slice(0, file.length - 3)} n'a pas de nom!`.red);
            }
            bot.commands.set(command.name, command);
            console.log(`La commande ${file} chargée avec succès!`.green);
        } catch (error) {
            console.error(`Une erreur de commande: ${error}`.red);
        }
    });
};
