const Discord = require('discord.js'); //npm install discord.js
const axios = require('axios'); //npm install axios

const client = new Discord.Client();
const prefix = '?'; //command prefix

client.once('ready', () => {
  // start the bot and set the status message
  console.log('the doorway has opened');
  client.user.setActivity('?tarot for a reading');
});

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = String(args).toLowerCase();

  if (command === 'tarot') {
    message.channel.send(
      'So you want to know your fortune.... please think of your intention as I draw the cards.'
    );

    let getCard = async () => {
      // pull the three cards
      let response = await axios.get(
        'https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3'
      );
      let card = response.data;
      return card;
    };

    let cardValue = await getCard();

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    //-----------------------
    message.channel.send('You pulled: ');

    for (let i = 0; i < cardValue.cards.length; i++) {
      let cardMeaning;
      let randomNum = getRandomInt(10);
      if (randomNum < 5) {
        cardMeaning = cardValue.cards[i].meaning_up;
      } else {
        cardMeaning = cardValue.cards[i].meaning_rev;
      }

      setTimeout(() => {
        message.channel.send(cardValue.cards[i].name + ' -- ' + cardMeaning);
      }, 2000);
    }
  }
});

//keep me at the end! redacted token for privacy
client.login('redacted');
