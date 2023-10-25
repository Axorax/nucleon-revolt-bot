const utils = require("../../../utils.js");

module.exports.run = (client, message, a, msg) => {
  try {
    if (String(msg).trim().length === 0)
      return message.reply("Provide some base64 text to decode!");
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Decode base64`,
          description: `**Text:** \`${msg}\`

**Decoded:**
${Buffer.from(msg, "base64").toString("ascii")}`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
