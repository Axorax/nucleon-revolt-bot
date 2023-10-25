const utils = require("../../utils.js");

module.exports.run = (client, message) => {
  try {
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Support ${client.user.username} by donating 💖`,
          description: `Donating helps us to keep the bot running!

[Patreon](https://www.patreon.com/axorax)`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
