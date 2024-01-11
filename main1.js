require('dotenv').config();
const {Client, IntentsBitField, userMention, MessageReaction} = require("discord.js");
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,

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
    //temps
    if(message.content == '+time') {
        let date = new Date();
        
        let content = 'Il est ' + date.getHours() + 'h:' + date.getMinutes() + 'm' + date.getSeconds() + 's';
        message.channel.send(content)
    }

    //date
    if(message.content == '+date') {
        let date = new Date();
        // Send date
        let date1 = date.getMonth() + 1
        if (date1 === 1){
            let content = 'La date est le ' + date.getDate() + ' janvier ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 2){
            let content = 'La date est le ' + date.getDate() + ' février ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 3){
            let content = 'La date est le ' + date.getDate() + ' mars ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 4){
            let content = 'La date est le ' + date.getDate() + ' avril ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 5){
            let content = 'La date est le ' + date.getDate() + ' mai ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 6){
            let content = 'La date est le ' + date.getDate() + ' juin ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 7){
            let content = 'La date est le ' + date.getDate() + ' juillet ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 8){
            let content = 'La date est le ' + date.getDate() + ' août ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 9){
            let content = 'La date est le ' + date.getDate() + ' septembre ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 10){
            let content = 'La date est le ' + date.getDate() + ' octobre ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 11){
            let content = 'La date est le ' + date.getDate() + ' novembre ' + date.getFullYear();
            message.channel.send(content)
        }
        if (date1 === 12){
            let content = 'La date est le ' + date.getDate() + ' décembre ' + date.getFullYear();
            message.channel.send(content)
        }
    }

    //help
    if (message.content == '+help'){
        message.reply(`Voici la liste de commandes \n+date \n+time \n+league`)
        
    }

});

//leagueperso
client.on('messageCreate', async message => {
    if (message.content === '+league') {
        let user = message.author
        const time = 7200000 //amount of time to collect for in milliseconds
        const emojis = ["💯"]; //the emojis to react

        message.channel.send("Perso league ?") 
        .then(async function (message) {
            for (let emoji of emojis) { await message.react(emoji) }
        const filter = (reaction, user) => {
            return reaction.emoji.name === '💯' && user.id === message.author.id;
        };

        const collector = message.createReactionCollector(filter, { time: time });

        collector.on('collect', (reaction, reactionCollector) => {
            console.log(reaction.count)
        if (reaction.count === 2){
            reaction.users.remove(client.user.id);

        }
        if (reaction.count === 11) {
            message.channel.send(`${user}, la perso est on!`);
            
           
            collector.stop();
        }
            });
        });
    
    }
});

//nombre de personnes
client.on('guildMemberAdd', async(member) => {
    await client.channels.cache.get('1194851271052632135').setName(`🌍 Total de personnes: ${member.guild.memberCount}`)
})
client.on('guildMemberRemove', async(member) => {
    await client.channels.cache.get('1194851271052632135').setName(`🌍 Total de personnes: ${member.guild.memberCount}`)
})

client.login(process.env.TOKEN);