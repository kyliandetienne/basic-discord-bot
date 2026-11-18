const { EmbedBuilder } = require('discord.js');
const config = require("../../config.js");
const prefix = config.prefix;

module.exports = {
  name: "embed-info",
  description: "Crée un embed d'informations",
  Permission: "staff",
  Usage: `${prefix}embed-info`,

  async run(client, message, args) {
    const hasStaffRole = message.member.roles.cache.some(role => config.staff.includes(role.id));
    if (!hasStaffRole) {
      return message.reply("Vous n'avez pas les permissions nécessaires pour utiliser cette commande.");
    }
    
    try {
      const embed = new EmbedBuilder()
        .setTitle("<:Star:1270868547110830111> ▸ __V3X - DONJON__")
        .setDescription("> Ce serveur a pour but de se connecter a notre self bot et par la suite nos divers Tools qui arriveront.")
        .setColor(config.color)
        .setTimestamp()
        .setAuthor({
          name: "V3X",
          url: "https://discord.gg/donjon",
          iconURL: "https://cdn.discordapp.com/attachments/1270838471384109157/1270838507321032734/v3x.jpg?ex=66b52817&is=66b3d697&hm=2630af1718108663e6ecaf4efc64f97b8a46ce05ffc41373bfd66630dab09726&"
        })
        .setFooter({
          text: "V3X - discord.gg/donjon",
          iconURL: "https://cdn.discordapp.com/attachments/1270838471384109157/1270838507321032734/v3x.jpg?ex=66b52817&is=66b3d697&hm=2630af1718108663e6ecaf4efc64f97b8a46ce05ffc41373bfd66630dab09726&"
        })
        .addFields(
          {
            name: "<:list:1270889648499064902> __**Les roles de V3X:**__",
            value: "> <:developpeur:1270863705118085191>  **Developpeur**\n*Les developpeurs de V3X.*\n> <:support:1270863546590433363>  **Génération Miracle**\n*Le rôle du support pour aider les membres avec les questions sur le projet.*\n> <:client:1270891099786842144> **VIP**\n*Le role des clients V3X.*\n> <:beta_tester:1270890074120261703> **Beta Tester**\n*Le rôle des 100 premiers connectés*\n> <:friends:1270863437479809105>  **Friends**\n*Friends sont les amis des owner de V3X.*\n> <:whitelist:1270863397231267922> **Whitelist**\n*La whitelist sont les membres qui ont remplis les conditions d'accès et peuvent se connecter à V3X.*",
            inline: false
          }
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/1270838471384109157/1270838507321032734/v3x.jpg?ex=66b52817&is=66b3d697&hm=2630af1718108663e6ecaf4efc64f97b8a46ce05ffc41373bfd66630dab09726&");

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("An error occurred while sending the embed: ", error);
      message.channel.send("An error occurred while trying to create the embed.");
    }
  }
};