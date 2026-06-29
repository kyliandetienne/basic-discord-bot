const config = require("../../config.js");
const prefix = config.prefix;


module.exports = {
    name: 'ping',
    description: 'Ping le bot pour voir son delai.',
    Permission: 'Aucune',
    Usage: `${prefix}ping`,

    async run(bot, message) {

        await message.reply(`Ping: \`${bot.ws.ping}\``);
    }
}

module.exports.help = {
    name: 'ping',
    description: 'Afficher la latence du bot.',
    category: "help"
}