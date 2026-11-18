const config = require("../../config.js");
const prefix = config.prefix;

module.exports = {
    name: "say",
    description: "Envoie un message une image a la place du bot",
    Permission: 'Staff',
    Usage: `${prefix}say`,
    async run(client, message, args) {
      const hasStaffRole = message.member.roles.cache.some(role => config.staff.includes(role.id));
      if (!hasStaffRole) {
        return message.reply("Vous n'avez pas les permissions nécessaires pour utiliser cette commande.");
      }
  
      const sayMessage = args.join(" ");
      if (!sayMessage) {
        return message.reply("Veuillez fournir un message pour que je puisse le dire.");
      }

      await message.delete();
      message.channel.send(sayMessage);
    }
  };
  