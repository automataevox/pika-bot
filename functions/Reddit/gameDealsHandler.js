const {SubmissionStream } = require("snoostorm");

module.exports = {
    async execute(client, r){
        const submissions = new SubmissionStream(r, {
            subreddit: "GameDealsFree",
            limit: 10,
            pollTime: 2000,
        });

        var oldPostTitle = null;
        var submission_counter = 0;
        var ignore_count = 10;
        await submissions.on("item", (post) => {
            if (submission_counter < ignore_count) {
                submission_counter++;
                //console.log("submission_counter: "+submission_counter);
                return;
            }

            let post_title = (post).title;
            console.log("POST: " + post_title);
            
            client.channels.cache.get("1046800149516660747").send("<@&956832113515171881> **" + post_title + "**" + "\n" + post.url);
            oldPostTitle = post.title;
            submission_counter++;
        });   
    }
}