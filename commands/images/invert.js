const utils = require("../../utils.js");
const { createCanvas, Image } = require("canvas");

module.exports.run = async (client, message, args, userMsg, a) => {
  try {
    let user;
    user = message.mentionIds
      ? await client.users.get(message.mentionIds[0])
      : /[0-9A-Z]{26}/.test(userMsg)
      ? await client.users.get(userMsg)
      : /^(http|https|www)/g.test(userMsg)
      ? void 0
      : await client.users.get(message.authorId);

    let url = user
      ? `https://autumn.revolt.chat/avatars/${user.avatar.id}/${user.avatar.filename}`
      : userMsg;

    const img = new Image();
    img.src = url;
    img.onload = async () => {
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = "difference";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, img.width, img.height);
      const r = canvas.toBuffer();
      const id = await a.upload.image(r, "image");
      message.reply({
        embeds: [
          {
            colour: utils.generateRandomHex(),
            title: `Invert`,
            media: id,
          },
        ],
      });
    };
    img.onerror = (e) => {
      return message.reply(
        `Invalid URL to image\n\n?invert <valid-link-to-image>`
      );
    };
  } catch (e) {
    message.reply(`Invalid URL to image\n\n?invert <valid-link-to-image>`);
    console.log(e);
  }
};
