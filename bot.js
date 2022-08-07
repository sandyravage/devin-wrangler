const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]})

client.once('ready', () => {
    console.log('Bot Ready!');
});

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", (msg) => {
    if(msg.author.bot) return;
    console.log("got message: " + msg.content);
    client.channels.cache.get(msg.channel.id).send("benis");
    client.channels.cache.get(msg.channel.id).send("also got ur message: " + msg.content);
});