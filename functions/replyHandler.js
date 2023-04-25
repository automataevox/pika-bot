const vocabulary = require('../AI/vocabulary.json');

module.exports = {
    async execute(message){
        const replyArray = [
            {
                "reply": "čaukyyyy \:grin:",
            },
            {
                "reply": "nazdaaar \:stuck_out_tongue_winking_eye:",
            },
            {
                "reply": "čégo \:wink:",
            },
            {
                "reply": "zdárek párek \:rofl:",
            }
        ];
        if(!message.author.bot && (message.channel.id === "946638170081067028" || message.channel.type === "dm")){
            if(await vocabulary.greeting.regular.includes(message.content)){
                const option = Math.floor(Math.random() * replyArray.length);
                await message.reply(`${replyArray[option].reply}`);
            } else await message.reply(message.content + " is not in vocabulary!");
        }
    }
};