const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const fetch = require('fetch');
const pixelmatch = require('pixelmatch');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]})

client.once('ready', () => {
    console.log('Bot Ready!');
});

client.login(process.env.DISCORD_TOKEN);

const refData = fs.readFileSync('./recursion.png', 'utf8');

client.on("messageCreate", async (msg) => {
    console.log("got attachment size: " + msg.attachments.size);
    if(msg.author.bot || msg.attachments.size == 0) return;
    const response = await fetch(msg.attachments.first().url);
    const arrayBuffer = await response.arrayBuffer();
    const currentData = Buffer.from(arrayBuffer);
    const diff = pixelmatch(refData, currentData, null, 684, 716);

    client.channels.cache.get(msg.channel.id).send("got diff: " + diff);
    //client.channels.cache.get(msg.channel.id).send(`also deleted ur message partner. <@${msg.author.id}> hee hee`);
});