const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const pixelmatch = require('pixelmatch');
const axios = require('axios').default;
const sharp = require('sharp');
const PNG = require('pngjs').PNG;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]})

client.once('ready', () => {
    console.log('Bot Ready!');
});

client.login(process.env.DISCORD_TOKEN);

const refData = fs.readFileSync('./recursion.png');
var refBuffer;
sharp(refData).toFormat('png').resize(684, 716).toBuffer().then(data => refBuffer = data);
const refImg = PNG.sync.read(refData);

client.on("messageCreate", async (msg) => {
    if(msg.author.bot || msg.attachments.size == 0) return;
    const response = await axios.get(msg.attachments.first().url, { responseType: 'arraybuffer' });
    const currentData = Buffer.from(response.data);
    const currentBuffer = await sharp(currentData).toFormat('png').resize(684, 716).toBuffer();
    const currentImg = PNG.sync.read(currentBuffer);
    const diff = pixelmatch(refImg.data, currentImg.data, null, 684, 716);
    if(diff < 60000) {
        msg.delete();
        msg.channel.send(`Uh oh Partners! Looks like <@${msg.author.id}> tried to post cringe! I've done deleted that pesky message for now, `
            + "but lets try to keep a better lookout in the future!");
    }
});