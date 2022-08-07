const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]})

client.once('ready', () => {
    console.log('Bot Ready!');
});

client.login(process.env.DISCORD_TOKEN);

const refData = fs.readFileSync('./recursion.png', 'utf8');

console.log("got ref Data: " + refData);

client.on("messageCreate", (msg) => {
    if(msg.author.bot) return;
    console.log("got message: " + msg.content);
    msg.delete();
    client.channels.cache.get(msg.channel.id).send("benis");
    client.channels.cache.get(msg.channel.id).send(`also deleted ur message partner. <@${msg.author.id}> hee hee`);
});