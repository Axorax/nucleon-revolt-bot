const utils = require("../../../utils.js");

module.exports.run = (client, message, args, userMsg) => {
  try {
    const hex = utils.generateRandomHex();
    message.reply({
      embeds: [
        {
          colour: hex,
          title: `← (Color Preview) Random Hex Code`,
          description: `${hex}`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    message.channel.sendMessage("**Error in generating random hex code...**");
  }
};
