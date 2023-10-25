const utils = require("../../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    const rgb = utils.generateRandomRgb();
    const arr = rgb.replace("rgb(", "").replace(")", "").split(",");
    message.reply({
      embeds: [
        {
          colour: rgb,
          title: `← (Color Preview) Random RGB Code`,
          description: `${rgb}
          
          Red: ${arr[0]}
          Green: ${arr[1]}
          Blue: ${arr[2]}`,
        },
      ],
    });
  } catch (error) {
    message.channel.sendMessage("**Error in generating random rgb code...**");
  }
};
