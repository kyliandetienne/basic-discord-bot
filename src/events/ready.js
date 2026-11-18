const { ActivityType } = require('discord.js');
const colors = require('colors');

function generateRandomStatus() {
  const statuses = ["casual", "V3X SB👑"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(`${client.user.tag} est bien en ligne!`.rainbow);
    console.log(`Le bot est utilisé sur ${client.guilds.cache.size} serveur(s) !`.bgBlue);
    console.log(`> [INVITE]: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`.bgMagenta);
    client.user.setStatus('dnd');
    setInterval(() => {
      const status = generateRandomStatus();
      client.user.setActivity(status, {
        type: ActivityType.Streaming,
        url: "https://twitch.tv/xinoxti"
      });
    }, 10000);
  }
};