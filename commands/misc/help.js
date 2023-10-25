const utils = require("../../utils.js");
const config = require("../../config.json");
const data = require("../../db/help-msg-autogenerated.json");
module.exports.run = (client, message, args, userMsg) => {
  try {
    if (args[0] && args[0] in data) {
      if (args[1]) {
        message.channel.sendMessage({
          embeds: [
            {
              colour: utils.generateRandomHex(),
              title: `${client.user.username} ${args[0]} ${args[1]} Help`,
              description:
                config.HELP[args[0]][args[1]] || "command does not exist!",
            },
          ],
        });
      } else {
        message.channel.sendMessage({
          embeds: [
            {
              colour: utils.generateRandomHex(),
              title: `${client.user.username} ${args[0]} Help`,
              description: data[args[0]],
            },
          ],
        });
      }
    } else {
      message.channel.sendMessage({
        embeds: [
          {
            colour: utils.generateRandomHex(),
            title: `${client.user.username} Help`,
            description: data.root,
          },
        ],
      });
    }
  } catch (error) {
    message.channel.sendMessage("An unexpected error occured!");
    console.log(error);
  }
};