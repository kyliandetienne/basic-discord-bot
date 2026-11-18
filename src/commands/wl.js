const { EmbedBuilder } = require('discord.js');
const config = require("../../config.js");
const prefix = config.prefix;

module.exports = {
  name: 'wl',
  description: 'Ajouter un membre dans la whitelist.',
  Permission: 'Staff',
  Usage: `${prefix}wl`,

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

    const member = message.guild.members.cache.get(userId);
    if (!member) return message.reply("L'utilisateur mentionné ou avec cet ID n'est pas dans ce serveur.");

    const role = config.wl;

    if (member.roles.cache.has(role)) {
      return message.reply("L'utilisateur est déjà dans la whitelist.");
    }

    var date = new Date();
    var jour = date.getDay();
    var heure = date.getHours();
    var minutes = date.getMinutes();
    var mois = date.getMonth();
    var annee = date.getFullYear();

    try {
      await member.roles.add(role);
      const embed = new EmbedBuilder()
        .setTitle("✅ ▸ Ajoute a la whitelist avec succès")
        .setDescription(`> (${member.toString()} | ${member.user.tag}) | ${member.user.id}) a été ajouté à la whitelist avec succès.`)
        .setTimestamp(new Date(Date.parse(`${mois + 1}/${jour}/${annee} ${heure}:${minutes}`)))
        .setFooter({
          text: `${message.author.tag}`,
          iconURL: message.author.displayAvatarURL()
        })
        .setColor(config.color);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("Une erreur est survenue lors de l'ajout du rôle.");
    }
  }
};
