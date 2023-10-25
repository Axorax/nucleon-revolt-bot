const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    const encode = String(Buffer.from(userMsg).toString("base64"));
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: "Mask Text",
          description: `**Original Text:**
      \`\`\`
      ${userMsg}
      \`\`\`

      **Masked Text Link:**
      • https://axorax.github.io/urlmskr/?t=${encode}`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
