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
client.on('messageCreate', async message => {
    if (message.content === '+league') {
        // Send the poll message
        const pollMessage = await message.channel.send('Perso league?');
        
        // Add the checkmark reaction
        await pollMessage.react('✅');
    
        // Create a filter to check for 1 reaction
        const filter = (reaction, user) => reaction.emoji.name === '✅' && !user.bot;
        
        // Set up a collector for reactions
        const collector = pollMessage.createReactionCollector(filter, { time: 60000  }); // Adjust the time as needed (in milliseconds)
    
        // Listen for reactions
        collector.on('collect', (reaction, user) => {
            if (pollMessage.reactions.cache.get('✅').count === 2) {
                // Ping the user who started the poll
                message.channel.send(`${message.author}, la perso est on!`);
                // Stop the collector to prevent further reactions
                collector.stop();
            }
        });
    
        // Listen for the end of the collector (time limit reached)
        collector.on('end', collected => {
            if (collected.size < 1) {
                message.channel.send('Pas assez de réactions :(');
            }
        });
    }
});



client.login(process.env.TOKEN);