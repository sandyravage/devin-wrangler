const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]})

client.once('ready', () => {
    console.log('Bot Ready!');
});

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", (msg) => {
    console.log("got message: " + msg);
    client.channels.cache.get(msg.channel.id).send0("benis");
});