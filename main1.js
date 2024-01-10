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

//Message test
const repliedMessages = new Set();

client.on('messageCreate', (message) => {
    if (message.author.bot || repliedMessages.has(message)) {
        return;
    }

    if (message.content.toLowerCase() === 'hello') {
        const username = message.member.displayName;

        message.reply(`Salut ${username}!`);

       
        repliedMessages.add(message);
        return;
    }
});

client.login(process.env.TOKEN);