const utils = require("../../utils.js");
const { createCanvas, loadImage } = require("canvas");

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
    loadImage("./images/wanted.png").then((bg) => {
      const canvas = createCanvas(bg.width, bg.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bg, 0, 0);
      loadImage(url).then(async (avatar) => {
        ctx.drawImage(avatar, 148.2, 358.9, 433.8, 430.6);
        const r = canvas.toBuffer();
        const id = await a.upload.image(r, "image");
        message.reply({
          embeds: [
            {
              colour: utils.generateRandomHex(),
              title: `Wanted`,
              media: id,
            },
          ],
        });
      });
    });
  } catch (e) {
    message.reply(`Invalid user!`);
  }
};
