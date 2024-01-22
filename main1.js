require('dotenv').config();
const {Client, IntentsBitField, userMention, MessageReaction, MessageEmbed} = require("discord.js");
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildBans,

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
    if(message.content.toLowerCase() == '+time') {
        let date = new Date();
        
        let content = 'Il est ' + date.getHours() + 'h:' + date.getMinutes() + 'm' + date.getSeconds() + 's';
        message.channel.send(content)
    }











    //date
    if(message.content.toLowerCase() == '+date') {
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
    if (message.content.toLowerCase() == '+help'){
        message.reply(`Voici la liste de commandes \n+date \n+time \n+league \n+kick(admin seulement) \n+ban(admin seulement) \n+roulette \n+flex \n+bj \n+money \n+roles(admin seulement)`)
        
    }

});



//leagueperso
client.on('messageCreate', async message => {
    if (message.content.startsWith('+league')) {
        let user = message.author;
        const time = 7200000; 
        const emojis = ["💯"]; 

        
        const specifiedHour = parseInt(message.content.split(' ')[1]) || 19;

        
        if (!isNaN(specifiedHour) && specifiedHour >= 0 && specifiedHour <= 23) {
            message.channel.send(`Perso league à ${specifiedHour}h ? ${message.guild.roles.cache.find(role => role.name === 'League')}`)
                .then(async function (message) {
                    for (let emoji of emojis) { await message.react(emoji); }

                    const filter = (reaction, user) => {
                        return reaction.emoji.name === '💯' && user.id === message.author.id;
                    };

                    const collector = message.createReactionCollector(filter, { time: time });

                    collector.on('collect', (reaction, reactionCollector) => {
                        console.log(reaction.count)
                        if (reaction.count === 2) {
                            reaction.users.remove(client.user.id);
                        }
                        if (reaction.count === 11) {
                            message.channel.send(`${user}, la perso est on à ${specifiedHour}h !`);
                            collector.stop();
                        }
                    });
                });
        } else {
            message.channel.send(`${user}, veuillez spécifier une heure valide (0-23) après la commande.`);
        }
    }
});




//roulette
client.on('messageCreate', (message) => {
    if (message.content.startsWith('+roulette')) {
        
        if (message.member.roles.cache.some(role => role.name === 'Collègue✌️')) {
            const member = message.author; 
            const chance = Math.random();

            
            if (chance < 0.5) {
                const memberTarget = message.guild.members.cache.get(member.id);
                
                if (memberTarget) {
                    message.channel.send('3...');
                    setTimeout(() => {
                        message.channel.send('2...');
                    }, 1000);
                    setTimeout(() => {
                        message.channel.send('1...');
                    }, 2000); 
                    setTimeout(() => {
                        
                        memberTarget.kick();
                        message.channel.send(`${member.tag} a été kick avec succès à la roulette.`);
                    }, 3000); 
                } else {
                    
                    message.channel.send('Impossible de trouver cet utilisateur sur le serveur.');
                }
            } else {
                message.channel.send('3...');
                setTimeout(() => {
                    message.channel.send('2...');
                }, 1000);
                setTimeout(() => {
                    message.channel.send('1...');
                }, 2000); 
                setTimeout(() => {
                    
                    message.channel.send(`${member.tag} a survécu la roulette.`);
                }, 3000); 
                    
            }
        } else {
            message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.');
        }
    }
});







//nombre de personnes
client.on('guildMemberAdd', async(member) => {
    await client.channels.cache.get('1194851271052632135').setName(`🌍 Total de personnes: ${member.guild.memberCount}`)
})
client.on('guildMemberRemove', async(member) => {
    await client.channels.cache.get('1194851271052632135').setName(`🌍 Total de personnes: ${member.guild.memberCount}`)
})




//kick
client.on('messageCreate', (message) => {
    if (message.content.startsWith('+kick')) {
        
        if (message.member.roles.cache.some(role => role.name === 'Admin')) {
            const member = message.mentions.members.first();

            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);

                if (memberTarget) {
                    
                    message.channel.send('3...');
                    setTimeout(() => {
                        message.channel.send('2...');
                    }, 1000);
                    setTimeout(() => {
                        message.channel.send('1...');
                    }, 2000); 
                    setTimeout(() => {
                        
                        memberTarget.kick();
                        message.channel.send(`${member.user.tag} a été kick avec succès.`);
                    }, 3000); 
                } else {
                    message.channel.send('Impossible de trouver ce membre sur le serveur.');
                }
            } else {
                message.channel.send('Aucun membre mentionné.');
            }
        } else {
            message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.');
        }
    }
});

//ban
client.on('messageCreate', (message) => {  
    if (message.content.startsWith('+ban')) {
        if (message.member.roles.cache.some(role => role.name === 'Admin')) {
            const member = message.mentions.members.first();
            
            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                
                if (memberTarget) {
                    memberTarget.ban();
                    message.channel.send(`${member.user.tag} a été ban avec succès.`);
                } else {
                    message.channel.send('Impossible de trouver ce membre sur le serveur.');
                }
            } else {
                message.channel.send('Aucun membre mentionné.');
            }
        } else {
            message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.');
        }
    }
});

//flex
client.on('messageCreate', async message => {
    if (message.content.startsWith('+flex')) {
        let user = message.author
        const time = 7200000 
        const emojis = ["🐶"]; 

        message.channel.send("Flex ?") 
        .then(async function (message) {
            for (let emoji of emojis) { await message.react(emoji) }
        const filter = (reaction, user) => {
            return reaction.emoji.name === '🐶' && user.id === message.author.id;
        };

        const collector = message.createReactionCollector(filter, { time: time });

        collector.on('collect', (reaction, reactionCollector) => {
            console.log(reaction.count)
        if (reaction.count === 2){
            reaction.users.remove(client.user.id);

        }
        if (reaction.count === 6) {
            message.channel.send(`${user}, la flex est on!`);
            
           
            collector.stop();
        }
            });
        });
    
    }
});

//blackjack
const prefix = '+';
const pointsMap = new Map();

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'bj') {
        
        const userPoints = pointsMap.get(message.author.id) || 0;

        
        const gainOrLoss = Math.random() < 0.5 ? -Math.floor(Math.random() * 21) : Math.floor(Math.random() * 21) + 1;
        const newPoints = userPoints + gainOrLoss;

        if (gainOrLoss < 0) {
            message.reply(`Vous avez perdu ${Math.abs(gainOrLoss)}$. Votre total est maintenant de ${newPoints}$`);

            if (newPoints <= -50) {
                
                const memberTarget = message.guild.members.cache.get(message.author.id);
                
                memberTarget.kick();
                message.channel.send(`${message.author.tag} a été kické car IL EST DAWG.`);

                pointsMap.delete(message.author.id);
                
            }
        } else {
            message.reply(`Vous avez gagné ${gainOrLoss}$. Votre total est maintenant de ${newPoints}$.`);
        }

        pointsMap.set(message.author.id, newPoints);
    } else if (command === 'money') {
       
        const userPoints = pointsMap.get(message.author.id) || 0;

        message.reply(`Vous avez actuellement ${userPoints}$.`);
    }
});

//générateur d'image (standby)
const PREFIX = '+'

//role assign FIFA, League, Rocket
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'roles') {

        if (!message.member.roles.cache.has('1100968323170173038')) {
            return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.");
        }

        const pollMessage = await message.channel.send('Sélectionnez votre jeu : 1️⃣ League, 2️⃣ FIFA, 3️⃣ Rocket');


        await pollMessage.react('1️⃣');
        await pollMessage.react('2️⃣');
        await pollMessage.react('3️⃣');

        const filter = (reaction, user) => {
            return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name);
        };

        const collector = pollMessage.createReactionCollector({ filter, dispose: true });

        collector.on('collect', (reaction, user) => {
            const member = reaction.message.guild.members.cache.get(user.id);

            switch (reaction.emoji.name) {
                case '1️⃣':
                    member.roles.add('1135028672047349841');
                    break;
                case '2️⃣':
                    member.roles.add('1128435042922811443');
                    break;
                case '3️⃣':
                    member.roles.add('1161082266345295882');
                    break;
            }

            console.log('Rôle attribué avec succès!');
        });

        collector.on('remove', (reaction, user) => {
            const member = reaction.message.guild.members.cache.get(user.id);

            switch (reaction.emoji.name) {
                case '1️⃣':
                    member.roles.remove('1135028672047349841');
                    break;
                case '2️⃣':
                    member.roles.remove('1128435042922811443');
                    break;
                case '3️⃣':
                    member.roles.remove('1161082266345295882');
                    break;
            }

            console.log('Rôle retiré avec succès!');
        });
    }
});
// origin

client.login(process.env.TOKEN);