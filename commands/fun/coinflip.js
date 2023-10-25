const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Coin Flip`,
          description: `:coin: Coin landed on **${utils.randomItemFromArray([
            "Heads",
            "Tails",
          ])}**`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
