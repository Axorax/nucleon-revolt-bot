const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    const num = utils.randomInteger(1, 6);
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Dice Roll - ${num}`,
          description: `:game_die: Dice landed on **${num}**`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
