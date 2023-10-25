const utils = require("../../../utils.js");

module.exports.run = async (client, message, args, userMsg, a) => {
  try {
    if (String(userMsg).trim().length === 0) {
      message.reply("Provide an username!");
      return;
    }
    const id = await a.upload.online(
      `https://minotar.net/armor/body/${encodeURIComponent(userMsg)}/700.png`
    );
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${userMsg}・mcskin`,
          description: `**Username:** \`${userMsg}\`

**Minecraft skin:**`,
          media: id,
        },
      ],
    });
  } catch (e) {
    message.reply("Invalid username!");
    console.log(e);
  }
};
