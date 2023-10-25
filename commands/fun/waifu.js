const utils = require("../../utils.js");
module.exports.run = async (client, message, args, userMsg, a) => {
  try {
    const request = await fetch("https://api.waifu.pics/sfw/waifu");
    const data = await request.json();
    let person = message.author.username;
    if (message.mentionIds) {
      person = client.users.get(message.mentionIds[0]).username;
    } else if (new RegExp("[0-9A-Z]{26}").test(userMsg)) {
      person = client.users.get(userMsg).username;
    }
    const id = await a.upload.online(data.url);
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          description: `Waifu for ${person}`,
          media: id,
        },
      ],
    });
  } catch (error) {
    message.channel.sendMessage("An error occured!");
    console.log(error);
  }
};
