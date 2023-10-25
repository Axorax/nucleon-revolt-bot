const utils = require("../../utils.js");

module.exports.run = async (client, message, args, userMsg) => {
  const ERROR = "Invalid usage!\n?dm-user <user-id/ping> <message>";
  try {
    if (message.authorId != utils.botOwner(client)) {
      return;
    }
    if (args[0] == undefined) {
      message.reply(ERROR);
      return;
    }
    let user;
    if (message.mentionIds) {
      user = client.users.get(message.mentionIds[0]);
    } else {
      user = client.users.get(args[0]);
    }
    const dm = await user.openDM();
    await dm.sendMessage(userMsg.replace(args[0], ""));
    message.reply("✅ | Successfully sent a message to " + user.username);
  } catch (error) {
    message.reply(ERROR);
    console.log(error);
  }
};
