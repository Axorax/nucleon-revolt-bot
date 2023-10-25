const utils = require("../../utils.js");

module.exports.run = (client, message) => {
  try {
    function uptime() {
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${client.user.username} Uptime`,
          description: `\`${uptime()}\``,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
