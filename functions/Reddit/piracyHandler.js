const {SubmissionStream } = require("snoostorm");

module.exports = {
    async execute(client, r){
        const submissions = new SubmissionStream(r, {
            subreddit: "testingBot18352",
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
            console.log(post);
            const channel = client.channels.cache.get('1098504712241823835');
            channel.threads.create({ name: post_title, message: { content: post.selftext }});
            
            oldPostTitle = post.title;
            submission_counter++;
        });   
    }
}