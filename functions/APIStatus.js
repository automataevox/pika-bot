
var embed;

module.exports = {
    async execute(message){
        var channel = message.channel;
        function updateEmbed() {

                
                
                channel.send(embed).then(message => {
                    myMessage = message;
                });
        }
        setInterval(updateEmbed, 4*1000);
    }
};