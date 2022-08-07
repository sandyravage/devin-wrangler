import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import fetch from 'node-fetch';
import pixelmatch from 'pixelmatch';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]})

client.once('ready', () => {
    console.log('Bot Ready!');
});

client.login(process.env.DISCORD_TOKEN);

const refData = fs.readFileSync('./recursion.png', 'utf8');

let array = [];

client.on("messageCreate", async (msg) => {
    if(msg.author.bot || msg.attachments.size == 0) return;
    const response = await fetch(msg.attachments.first().url);
    const arrayBuffer = await response.arrayBuffer();
    const currentData = Buffer.from(arrayBuffer);
    const diff = pixelmatch(refData, currentData, null, 684, 716);

    msg.channel.send("got diff: " + diff);
    //client.channels.cache.get(msg.channel.id).send(`also deleted ur message partner. <@${msg.author.id}> hee hee`);
});