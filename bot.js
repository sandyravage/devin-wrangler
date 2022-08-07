const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const pixelmatch = require('pixelmatch');
const axios = require('axios').default;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]})

client.once('ready', () => {
    console.log('Bot Ready!');
});

client.login(process.env.DISCORD_TOKEN);

const refData = fs.readFileSync('./recursion.png');

client.on("messageCreate", async (msg) => {
    if(msg.author.bot || msg.attachments.size == 0) return;
    const response = await axios.get(msg.attachments.first().url, { responseType: 'arraybuffer' });
    const currentData = Buffer.from(response.data);
    const diff = pixelmatch(refData, currentData, null, 684, 716);

    msg.channel.send("got diff: " + diff);
    //client.channels.cache.get(msg.channel.id).send(`also deleted ur message partner. <@${msg.author.id}> hee hee`);
});