const utils = require("../../utils.js");

module.exports.run = async (client, message, args) => {
  try {
    const arr = args.filter((item) => item.replace(/ /g, "") !== "");
    if (!arr[0]) return message.reply("No emoji provided!");
    const emoji = arr[0].replaceAll(":", "");
    let size = 128;
    if (arr[1] && /^\d+$/.test(arr[1])) {
      size = arr[1];
    }
    message.reply({
      content: `[ ](https://autumn.revolt.chat/emojis/${emoji}?size=${size})`,
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `🔍・Resize emoji`,
        },
      ],
    });
  } catch (e) {
    message.reply("Invalid usage!");
    console.log(e);
  }
};
