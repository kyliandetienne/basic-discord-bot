require('colors');

module.exports = {
    name: 'messageCreate',
    async run(client, message) {
        if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        if (command === 'wl') {
            const requiredRole = message.guild.roles.cache.find(role => role.name === (config.role));
        
            if (!message.member.roles.cache.has(requiredRole.id)) {
              return message.reply('Tu n\'as pas le role requis pour utiliser cette commande.');
            }
        }

        try {
            command.run(client, message, args);
        } catch (error) {
            console.error(error);
            message.reply(`Une erreur de commande`);
       }
   }
}