const utils = require("../../utils.js");
module.exports.run = async (client, message) => {
  try {
    if (message.authorId == utils.botOwner(client)) {
      let msg = await message.channel.sendMessage(
        "Reconnecting to websocket ..."
      );
      await msg.edit({
        content: `✅ | Reconnected to websocket!`,
      });
      await client.events.disconnect();
      client.events.connect();
    } else {
      return;
    }
  } catch (error) {
    console.log(`Error with ws-reconnect:\n ${error}`);
  }
};
