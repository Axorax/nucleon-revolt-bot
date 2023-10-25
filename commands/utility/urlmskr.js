const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    const encode = String(Buffer.from(userMsg).toString("base64"));
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: "Mask Link",
          description: `**Original Link:** ${userMsg}

      **Masked Links:**
      • https://axorax.github.io/urlmskr/${encode}`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
