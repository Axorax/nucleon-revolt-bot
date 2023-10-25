const utils = require("../../utils.js");

module.exports.run = (client, message) => {
  try {
    let t = new Date(),
      c = new Date(t.getFullYear(), 11, 24);
    11 == t.getMonth() &&
      t.getDate() > 24 &&
      c.setFullYear(c.getFullYear() + 1);
    let o = 864e5,
      a = Math.ceil((c.getTime() - t.getTime()) / o),
      d = a + 1;
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `🎄・xmas`,
          description: `${d} days until christmas!`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
