const utils = require("../../../utils.js");

module.exports.run = async (c, message, a, userMsg) => {
  try {
    if (String(userMsg).trim().length === 0) {
      message.reply("Provide an IP! (example - mc.hypixel.net)");
      return;
    }
    fetch(`https://api.mcsrvstat.us/2/${userMsg}`)
      .then((res) => res.json())
      .catch({})
      .then(async (json) => {
        if (!json.players) return message.reply("Invalid IP!");

        message.channel.sendMessage({
          embeds: [
            {
              icon_url: `https://eu.mc-api.net/v3/server/favicon/${userMsg}`,
              colour: utils.generateRandomHex(),
              title: `${userMsg}・mcip`,
              description: `💻 IP: \`${userMsg}\`
🟢 Online: \`${json.online}\`
🏷️ Version: \`${json.version}\`
⚙️ Protocol: \`${json.protocol}\`
👤 Players online: \`${json.players.online}\`
⛔ Maximum players: \`${json.players.max}\``,
            },
          ],
        });
      });
  } catch (e) {
    message.reply("Invalid IP!");
    console.log(e);
  }
};
