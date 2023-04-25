/*- DEPENDECIES =======*/
const {Client, GatewayIntentBits, Events, Collection, Partials } = require('discord.js');
const dotenv = require('dotenv');

/*- FILES =============*/
const status = require('./functions/status.js');
const eventHandler = require('./functions/interaction.js');
const commander = require('./functions/commandHandler.js');
const aiChatHandler = require('./AI/chat-operator.js');
const redditParser = require('./functions/redditHandler.js');

/*- INIT ==============*/
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent] },{partials: [Partials.Channel, Partials.Message]});
const commands = client.commands = new Collection();


/*- RUNNERS ===========*/
dotenv.config();
commander.execute(commands);

/*- CODE ==============*/ 
client.on("ready", () => {
	console.log(client.user.tag + " joined the game!");
	status.execute(client);
	redditParser.execute(client);
	
});

client.on("messageCreate", async (message) => {
	if(client.user.presence.status === "online") aiChatHandler.execute(message);
	
	/*if(message.content == "//status"){
		if(message.author == "681885446455689216"){
			if(message.channelId == "1047074607481499649"){
				message.delete();
				APIStatus.execute(message);
			} else message.reply("You are not in right channel!");
		}else message.reply("You are not authorized to use this command!");
	}*/
});

client.on(Events.InteractionCreate, async event => {
	eventHandler.execute(event);
});


/*- LOGIN =============*/ 
client.login(process.env.DISCORD_TOKEN);