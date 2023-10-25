const utils = require("../../../utils.js");

module.exports.run = async (client, message, args, userMsg, a) => {
  try {
    if (!Boolean(message.channel.server))
      return message.reply("This command can only be used in a server!");
    const id = await a.upload.online(message.channel.server.banner.url);
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${message.channel.server.name} - ${message.channel.server.banner.filename} - ${message.channel.server.banner.humanReadableSize}`,
          media: id,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
