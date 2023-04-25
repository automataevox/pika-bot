const fetch = require('node-fetch');
const status = require('../functions/status.js');
API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill' 

module.exports = {
    async execute(message){
        if(message.channel.id === "1038026126330703943"){
            if (message.author.bot) {
                return;
            }
            // form the payload
            const payload = {
                inputs: {
                    text: message.content
                }
            };
            // form the request headers with Hugging Face API key
            const headers = {
                'Authorization': 'Bearer ' + process.env.HUGGINGFACE_TOKEN
            };
            
            // set status to typing
            //message.channel.startTyping();
            // query the server
            const response = await fetch(API_URL, {
                method: 'post',
                body: JSON.stringify(payload),
                headers: headers
            });
            const data = await response.json();
            let botResponse = '';
            if (data.hasOwnProperty('generated_text')) {
                botResponse = data.generated_text;
            } else if (data.hasOwnProperty('error')) { // error condition
                botResponse = data.error;
            }
            message.reply(botResponse);
         }
    }
}