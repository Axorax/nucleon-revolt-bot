const utils = require("../utils.js");

function rate(message, m = "", title = "Nucleon", thing = "", grammar = "") {
  try {
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: title,
          description: `<@${
            message.mentionIds
              ? message.mentionIds[0]
              : /[0-9A-Z]{26}/.test(m)
              ? m
              : message.authorId
          }> is ${grammar}\`${Math.ceil(100 * Math.random())}%\` ${thing}`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = rate;
