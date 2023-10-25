const utils = require("../../../utils.js");

module.exports.run = (client, message, a, msg) => {
  try {
    if (String(msg).trim().length === 0)
      return message.reply("Provide some text to encode!");
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Encode base64`,
          description: `**Text:** \`${msg}\`

**Encoded:**
${Buffer.from(msg).toString("base64")}`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
