const utils = require("../../utils.js");

module.exports.run = (client, message) => {
  try {
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${client.user.username}'s ping 🏓`,
          description: `🤖 ┆ Bot Latency: ${Date.now() - message.createdAt}ms
💻 ┆ API Latency: ${client.events.ping()}ms`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
