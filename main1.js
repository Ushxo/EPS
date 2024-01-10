require('dotenv').config();
const {Client, IntentsBitField, userMention} = require("discord.js");
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,

    ]
});
//Bot en ligne
client.on('ready', (c) => {
    console.log("Im here.")
});

//Message Salut
const repliedMessages = new Set();

client.on('messageCreate', (message) => {
    if (message.author.bot || repliedMessages.has(message)) {
        return;
    }
    

    if (message.content.toLowerCase() === `hello epsbot`) {
        const username = message.member.displayName;
        

        message.reply(`Salut ${username}!`);

       
        repliedMessages.add(message);
        return;
    }
});

//polls

client.login(process.env.TOKEN);