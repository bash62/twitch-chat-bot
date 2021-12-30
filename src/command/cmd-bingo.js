const axios = require('axios')



exports.Bingo = class {
    constructor(val,client,channel) {
        this.active = true;
        this.val = val;
        this.val_array = [];
        this.val_array_bot = [];
        this.interval = null;
        this.client = client;
        this.channel = channel;
        this.sendWebHook("Un nouveau bingo est lancé :");
        
    }

    sendWebHook(message){
        axios.post('https://canary.discord.com/api/webhooks/921124944232984588/8SXx0CCkf1vjBfCybeF0WXTwHoUwiBCfQ0nLKxW8bQGrKSMHxK0tAKlcjh4vuWxeBQoh', {
            content: `${message} ${this.val}`
        })
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            //console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
    }

    startBoting(channel){
        let val = String(this.getNextVal());
        if(val != "undefined"){
            this.client.say(channel,val);
            this.val_array_bot.push(val);
        } 

    
    }

    setIntervals(interval){
        this.interval = interval;

    }

    clear(){
        clearInterval(this.interval);
        this.active = false;
    }

    getVal(){
        return this.val;
    }

    getValArray(){
        return this.val_array;
    }


    getValArrayBot(){
        return this.val_array_bot;
    }

    isActive(){
        return this.active;
    }
    // Add val and sort it asc;

    addVal(val){
        if(typeof val == "string" && val.slice(0).split(' ').length > 1) return false;
        typeof val == "string" ? (val=parseInt(val.slice(0).split(' ')[0])) : (val=val)
        if(isNaN(val)) return false;

        if(!this.val_array.includes(val) && val <= this.val && val > 0){
            this.val_array.push(val);
            this.sortArrayAsc();
        }
        else {
            return false;
        }
    }

    getNextVal(){
        let found = false;
        let pointer = 0;
        let res = -1;
        while(!found){
            
            if(pointer + 1 ==  this.val ){
                this.clear();
                found = true;
                return;

            }
            else if(this.val_array[0] != 1){
                res = 1;
                found = true;

            }
            else{
                if(this.val_array[pointer + 1] != this.val_array[pointer] + 1 ){
                    res = this.val_array[pointer] + 1;
                    found = true;
                }
            }
            pointer += 1;
        }
        this.addVal(res);
        return res;
    }

    sortArrayAsc(){
        this.val_array = this.val_array.sort((a,b) => a - b);

    }

}

exports.bingoDone =  (message,tags,Bingo) => {
    if(tags.username == "wizebot"){
            if(message.includes("GAGNE")){
                Bingo.clear();
                console.log(Bingo.getValArray());
                Bingo.sendWebHook(message);
                Bingo.sendWebHook("Essayé par le bot : "+Bingo.getValArrayBot())
            }
    }
    else{
        return;
    }
}
/**
 * 
 * @param {*} message 
 * @returns {null|Bingo} 
 */

exports.bingoStarted = (message,client,channel) => {
    const val_bingo = parseInt(message.slice(0).split(' ')[1])

    if(message.startsWith('!bingo') && !isNaN(val_bingo)){
        //console.log("Un bingo est lancé :",1,'-',val_bingo);

        return new this.Bingo(val_bingo,client,channel);
    }
    else{

        return null;
    }
    
};

