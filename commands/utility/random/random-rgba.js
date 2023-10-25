const utils = require("../../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    const rgba = utils.generateRandomRgba();
    const arr = rgba.replace("rgba(", "").replace(")", "").split(",");
    message.reply({
      embeds: [
        {
          colour: `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`,
          title: `← (RGB Preview) Random RGBA Code`,
          description: `${rgba}
          
          Red: ${arr[0]}
          Green: ${arr[1]}
          Blue: ${arr[2]}
          Alpha: ${arr[3]}`,
        },
      ],
    });
  } catch (error) {
    message.channel.sendMessage("**Error in generating random rgbacode...**");
  }
};
