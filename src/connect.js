const tmi = require('tmi.js');
let {bingoStarted,bingoDone, Bingo} = require('./command/cmd-bingo');
let config = require('../config.json');
console.log(config.username)

const client = new tmi.Client({
	options: { debug: true },
    connection: {
        reconnect: true
    },
	identity: {
		username: config.username,
		password: config.token
	},
  channels: [ 'proteamsurtwiitch', "sand_keys" ]
});

client.connect();


let bingo = null;

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self){
		console.log(message);
		return;
	}

    if(bingo != null){
		if(!bingo.isActive()){
			bingo = null;
		}
		else{
			if(tags.username == "wizebot"){
				bingoDone(message,tags,bingo);

			}
			else{
				bingo.addVal(message);


			}
		}
	}
	if(tags.username == "proteamsurtwiitch" && message.startsWith('!bingo')){
		if( bingo == null){
			bingo = bingoStarted(message,client,channel);
			let i = setInterval( () => {
				bingo.startBoting(channel);
				

			},1000)
			bingo.setIntervals(i);
		}

	}
});



		
