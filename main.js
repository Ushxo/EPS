const {Client, IntentsBitField} = require("discord.js");
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,

    ]
});

client.login("NjM5MjQzMjc2Mzc2ODY2ODE3.GU2NGB.T0gbUme3ERoyiz98jyaXNS8MSqGfZs298gR3eI")