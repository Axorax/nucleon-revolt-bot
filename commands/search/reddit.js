const utils = require("../../utils.js");

module.exports.run = async (client, message, args, u, a) => {
  try {
    let url;
    if (String(u).trim().length === 0) {
      const r = ["memes", "me_irl", "dankmemes", "comedyheaven", "linuxmemes"];
      url = r[Math.floor(Math.random() * r.length)];
    } else {
      url = u;
    }
    const res = await fetch(`https://www.reddit.com/r/${url}/random/.json`);
    const json = await res.json();
    if (!json[0])
      return message.reply("Unable to get meme! Please try again later :(");
    const data = json[0].data.children[0].data;
    const id = await a.upload.online(data.url);
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          description: `## [${data.title}](https://reddit.com${data.permalink})`,
          media: id,
        },
      ],
    });
  } catch (e) {
    message.reply("Invalid subreddit or Reddit rate limit! Try again later...");
    console.log(e);
  }
};
