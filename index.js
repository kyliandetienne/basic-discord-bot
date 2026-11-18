const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require("./config")
require('colors');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.slashcommand = new Collection()
client.commands = new Collection();

require('./src/Handlers/loadEvents.js')(client);
require('./src/Handlers/loadCommands.js')(client);
require("./src/Handlers/loadSlashCommands.js")(client);

process.on('unhandledRejection', (reason, p) => {
    console.log(' [antiCrash] :: Unhandled Rejection/Catch');
    console.log(reason, p);
});
process.on('uncaughtException', (err, origin) => {
    console.log(' [antiCrash] :: Uncaught Exception/Catch');
    console.log(err, origin);
}) 
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
    console.log(err, origin);
});


client.login(config.token);