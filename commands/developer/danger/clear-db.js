const utils = require("../../../utils.js");
const mongo = require("../../../mongodb.js");

module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (message.authorId != utils.botOwner(client)) {
      return;
    }
    const m = await message.channel.sendMessage("Clearing database ...");
    mongo.clear();
    m.edit({
      content: `✅ | Finished clearing database!`,
    });
  } catch (error) {
    console.log(error);
  }
};
