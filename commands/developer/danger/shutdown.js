const utils = require("../../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (message.authorId == utils.botOwner(client)) {
      let msg = await message.channel.sendMessage("Shutting down ...");
      await msg.edit({
        content: `Bot has been shut down!`,
      });
      process.exit();
    } else {
      return;
    }
  } catch (error) {
    console.log(`Error with shutdown:\n ${error}`);
  }
};
