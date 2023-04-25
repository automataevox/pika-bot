const { SlashCommandBuilder } = require('discord.js');
const Snoowrap = require('snoowrap');
const dotenv = require('dotenv');

dotenv.config();

const r = new Snoowrap({
    userAgent: "Hoshiko#4709 (Discord Bot)",
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
});
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reddit')
		.setDescription('Provides information about the server.')
        .addStringOption(option =>
            option.setName('subreddit')
                .setDescription('subreddit to fetch from')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('pop/hot/new')
                .addChoices(
                    { name: 'Top', value: 'top' },
                    { name: 'Hot', value: 'hot' },
                    { name: 'New', value: 'new' },
                )),

	async execute(event) {
        const subreddit = event.options.getString('subreddit');
        const category = event.options.getString('category') ?? 'hot';
        
        if (category == 'hot') url = await (await r.getSubreddit(subreddit).getHot()).map(post => post.url).then(event.reply(post.url[0]));
        if (category == 'new') url = await (await r.getSubreddit(subreddit).getNew()).map(post => post.url).then(event.reply(post.url[0]));
        if (category == 'top') url = await (await r.getSubreddit(subreddit).getTop()).map(post => post.url).then(event.reply(post.url[0]));
	},
};