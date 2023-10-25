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

    loadImage(url)
      .then(async (bg) => {
        const canvas = createCanvas(500, 500);
        const ctx = canvas.getContext("2d");
        const circle = {
          x: canvas.width / 2,
          y: canvas.height / 2,
          radius: canvas.width / 2,
        };

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(bg, 0, 0, 500, 500);
        const r = canvas.toBuffer();
        const id = await a.upload.image(r, "image");
        message.reply({
          embeds: [
            {
              colour: utils.generateRandomHex(),
              title: `Circle`,
              media: id,
            },
          ],
        });
      })
      .catch((err) => {
        return message.reply("Invalid user or link!");
      });
  } catch (e) {
    message.reply(`Invalid user or link!`);
  }
};
