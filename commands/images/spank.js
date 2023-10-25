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

    loadImage("./images/spank.png").then((bg) => {
      const canvas = createCanvas(500, 500);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bg, 0, 0, 500, 500);
      loadImage(url).then(async (avatar) => {
        ctx.drawImage(avatar, 350, 220, 120, 120);
        loadImage(
          `https://autumn.revolt.chat/avatars/${message.author.avatar.id}/${message.author.avatar.filename}`
        ).then(async (s) => {
          ctx.drawImage(s, 225, 5, 140, 140);
          const r = canvas.toBuffer();
          const id = await a.upload.image(r, "image");
          message.reply({
            embeds: [
              {
                colour: utils.generateRandomHex(),
                title: `Spank`,
                media: id,
              },
            ],
          });
        });
      });
    });
  } catch (e) {
    message.reply(`Invalid user!`);
  }
};
