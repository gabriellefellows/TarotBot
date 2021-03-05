const Discord = require('discord.js') //npm install discord.js
const axios = require('axios');       //npm install axios

const client = new Discord.Client();
const prefix = '?'; //command prefix


client.once('ready', () => { // start the bot and set the status
    console.log('the doorway has opened');
    client.user.setActivity('?tarot for a reading');
});



client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = String(args).toLowerCase();



    if (command === 'tarot') {
        message.channel.send('So you want to know your fortune.... please think of your intention as I draw the cards.')

        let getCard = async() => { // pull the three cards
            let response = await axios.get('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3')
            let card = response.data;
            return card;
        }

        let cardValue = await getCard();
        


        const msgEmbed = new Discord.MessageEmbed()
            .setColor('#c795cf')
            .setTitle('You pulled...')
            .addFields(
                { name: cardValue.cards[0].name , value: cardValue.cards[0].meaning_up , inline: true},
                { name: cardValue.cards[1].name , value: cardValue.cards[1].meaning_up, inline: true},
                { name: cardValue.cards[2].name , value: cardValue.cards[2].meaning_rev , inline: true},
            )
            .setTimestamp()

        
        setTimeout(()=>{
            message.reply(msgEmbed)
        }, 2500);
    }
    })

    

//keep me at the end! redacted token for privacy
client.login('token');