const utils = require("../../utils.js");
const os = require("os");

module.exports.run = (client, message) => {
  try {
    function uptime() {
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${client.user.username} Statistics`,
          description: `Server Count: \`${client.servers.size()}\`
      User Count: \`${client.users.size()}\`
      Channel Count: \`${client.channels.size()}\`
      Message Count: \`${client.messages.size()}\`
      Free memory: \`${os.freemem() / (1024 * 1024)} MB\`
      Machine: \`${os.machine()}\`
      Uptime: \`${uptime()}\``,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
