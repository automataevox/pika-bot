const fetch = require('node-fetch');
const API_URL = 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5' 

module.exports = {
    async execute(message){
            const payload = {
                image: {
                    prompt: message,
                    images: 1
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
            return botResponse;
    }
}