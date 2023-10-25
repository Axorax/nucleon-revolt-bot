const utils = require("../../utils.js");
const math = require("mathjs");
module.exports.run = (client, message, args, userMsg) => {
  try {
    if (String(userMsg).trim() == "config") {
      message.reply(`**Invalid Question**`);
      return;
    }
    const evaluate = math.evaluate(userMsg);
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: "Math Solve",
          description: `**Question:**
          ${userMsg}
          
          **Answer:**
          ${evaluate}`,
        },
      ],
    });
  } catch (error) {
    message.reply(`**Invalid Question**`);
  }
};
