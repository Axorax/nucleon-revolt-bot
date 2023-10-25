const utils = require("../../utils.js");
const { createCanvas } = require("canvas");

module.exports.run = async (client, message, args, m, a) => {
  try {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = m;
    ctx.fillRect(0, 0, 500, 500);
    const r = await canvas.toBuffer();
    const id = await a.upload.image(r, "image");
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `◼️・color visualize`,
          description: `**Color:** \`${m}\`\n\n**Visualized:**`,
          media: id,
        },
      ],
    });
  } catch (e) {
    message.reply("Invalid usage!");
    console.log(e);
  }
};
