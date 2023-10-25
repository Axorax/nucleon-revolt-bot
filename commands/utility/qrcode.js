const utils = require("../../utils.js");

module.exports.run = async (client, message, args, userMsg, a) => {
  try {
    if (String(userMsg).trim().length === 0) {
      message.reply("Provide some text!");
      return;
    }
    const id = await a.upload.online(
      `https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${encodeURIComponent(
        userMsg
      )}`
    );
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: "📱・qrcode",
          description: `**Text:**
${userMsg}

**QR code:**`,
          media: id,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
