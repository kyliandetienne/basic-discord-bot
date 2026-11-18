const fs = require('fs');
const path = require('path');
require('colors');

module.exports = (client) => {
    const eventsDir = path.join(__dirname, '../events');

    fs.readdirSync(eventsDir).filter(file => file.endsWith('.js')).forEach(file => {
        try {
            const event = require(path.join(eventsDir, file));
            if (!event.name || typeof event.name !== "string") {
                throw new TypeError(`L'événement ${file.slice(0, file.length - 3)} n'a pas de nom!`.red);
            }
            if (event.once) {
                client.once(event.name, (...args) => event.run(client, ...args));
            } else {
                client.on(event.name, async (...args) => {
                    try {
                        await event.run(client, ...args);
                    } catch (error) {
                        console.error(`Erreur lors de l'exécution de l'événement: ${error}`.red);
                    }
                });
            }
            console.log(`✅・L'événement ${file} chargé avec succès!`.green);
        } catch (error) {
            console.error(`Une erreur d'événement: ${error}`.red);
        }
    });
};