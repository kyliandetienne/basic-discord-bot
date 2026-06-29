const { EmbedBuilder } = require('discord.js');
const config = require("../../config.js");
const prefix = config.prefix;

module.exports = {
  name: "unwl",
  description: "Enlever un membre de la wl",
  Permission: 'Staff',
  Usage: `${prefix}unwl`,
  
  async run(client, message, args) {
    const hasStaffRole = message.member.roles.cache.some(role => config.staff.includes(role.id));
    if (!hasStaffRole) {
      return message.reply("Vous n'avez pas les permissions nécessaires pour utiliser cette commande.");
    }

   let userId;

    if (message.mentions.users.size > 0) {

    userId = message.mentions.users.first().id;
    } else {

      userId = args[0];
      if (!/^\d{17,19}$/.test(userId)) return message.reply("L'ID fourni n'est pas valide.");
    }

    if (!userId) return message.reply("Veuillez mentionner un utilisateur ou fournir un ID d'utilisateur.");

    const member = await message.guild.members.fetch(userId);
    if (!member) return message.reply("L'utilisateur mentionné ou avec cet ID n'est pas dans ce serveur.");

    const role = config.wl;

    if (!member.roles.cache.has(role)) {
      return message.reply("L'utilisateur n'est pas dans la whitelist.");
    }

    var date = new Date();
    var jour = date.getDay();
    var heure = date.getHours();
    var minutes = date.getMinutes();
    var mois = date.getMonth();
    var annee = date.getFullYear();

    try {
      await member.roles.remove(role);
      const embed = new EmbedBuilder()
      .setTitle("✅ ▸ Enlevement de la whitelist avec succès")
      .setDescription(`> (${member.toString()} | ${member.user.tag}) | ${member.user.id}) a été retiré de la whitelist avec succès.`)
      .setTimestamp(new Date(Date.parse(`${mois + 1}/${jour}/${annee} ${heure}:${minutes}`)))
      .setFooter({
          text: `${message.author.tag}`,
          iconURL: message.author.displayAvatarURL()
        })
      .setColor(config.color);
    
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("Une erreur est survenue lors de l'enlevement du rôle.");
    }
  }
};