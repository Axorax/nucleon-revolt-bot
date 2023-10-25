const utils = require("../../utils.js");

module.exports.run = async (client, message, args, u, a) => {
  try {
    const res = await fetch("https://meme-api.com/gimme");
    const json = await res.json();
    const id = await a.upload.online(json.url);
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          description: `## [${json.title}](https://reddit.com${json.postLink})`,
          media: id,
        },
      ],
    });
  } catch (e) {
    message.reply("Unable to get meme! Please try again later :(");
  }
};
