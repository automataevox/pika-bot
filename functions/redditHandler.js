const Snoowrap = require('snoowrap');
const dotenv = require('dotenv');

dotenv.config();

const gameDealsHandler = require('./Reddit/gameDealsHandler.js');
const piracyHandler = require('./Reddit/piracyHandler.js');

const r = new Snoowrap({
    userAgent: "Hoshiko#4709 (Discord Bot)",
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
});

module.exports = {
    async execute(client){
        gameDealsHandler.execute(client, r);
        
        piracyHandler.execute(client, r);
    }
};
