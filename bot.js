const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds]})

client.once('ready', () => {
    console.log('Bot Ready!');
});

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", (msg) => {
    client.createMessage(msg.channel.id, "benis");
});