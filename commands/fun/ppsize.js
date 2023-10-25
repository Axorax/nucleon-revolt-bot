const utils = require("../../utils.js");
module.exports.run = async (client, message) => {
  try {
    if (message.mentionIds) {
      const user = client.users.get(message.mentionIds[0]);
      const count = utils.randomInteger(0, 8);
      let size = "8";
      for (let i = 0; i < count; i++) {
        size += "=";
      }
      message.channel.sendMessage({
        embeds: [
          {
            colour: utils.generateRandomHex(),
            title: "pp size machine",
            description: `${user.username}'s pp size
              ${size}D`,
            icon_url: `${user.avatarURL}`,
          },
        ],
      });
    } else {
      const user = client.users.get(message.authorId);
      const count = utils.randomInteger(0, 8);
      let size = "8";
      for (let i = 0; i < count; i++) {
        size += "=";
      }
      message.channel.sendMessage({
        embeds: [
          {
            colour: utils.generateRandomHex(),
            title: "pp size machine",
            description: `${user.username}'s pp size
              ${size}D`,
            icon_url: `${user.avatarURL}`,
          },
        ],
      });
    }
  } catch (error) {
    message.channel.sendMessage("**Command failed!**");
    console.log(error);
  }
};
