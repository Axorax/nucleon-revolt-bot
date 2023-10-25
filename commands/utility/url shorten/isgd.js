const utils = require("../../../utils.js");

module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (userMsg.trim().length === 0) {
      message.reply("Provide a URL to shorten!");
      return;
    }
    const request = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(userMsg)}`,
      {
        method: "POST",
      }
    );
    const data = await request.json();
    if (data.shorturl == undefined) {
      message.channel.sendMessage(`**Invalid URL!**`);
      return;
    }
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Shorten URL`,
          description: `Original URL: ${userMsg}
Short URL: ${data.shorturl}`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
