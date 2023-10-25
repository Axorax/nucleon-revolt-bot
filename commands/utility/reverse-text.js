const utils = require("../../utils.js");

module.exports.run = (client, message, args, userMsg) => {
  try {
    if (String(userMsg).trim().length === 0) {
      message.reply("Provide some text to reverse!");
      return;
    }
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Reverse text`,
          description: `**Original text:**
${userMsg}

**Reversed text:**
${userMsg.split("").reverse().join("")}`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
