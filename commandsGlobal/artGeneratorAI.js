const { SlashCommandBuilder } = require('discord.js');
const aiArtHandler = require('../AI/art-operator.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('imagine')
		.setDescription('Creates AI generated art.')
		.addStringOption(option =>
            option.setName('prompt')
                .setDescription('prompt to generate image from')
                .setRequired(true)),
	async execute(event) {
		const prompt = event.options.getString('prompt');
		const messageCode = "```";
		var messageBody = "";
		const messageAIHandler = "[AI Handler] ";
		const enter = "\n";
		const reply = await aiArtHandler.execute(prompt);
		if(await reply){
			messageBody += messageAIHandler+"OK"+enter;
			messageBody += messageAIHandler+"Response: "+reply+enter;
			event.reply(messageCode+messageBody+messageCode); 
		} else{
			messageBody += messageAIHandler+"KO"+enter;
			messageBody += messageAIHandler+"Response: "+reply+enter;
			event.reply(messageCode+messageBody+messageCode);
		} 
	},
};