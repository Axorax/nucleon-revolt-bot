const utils = require("../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (message.authorId != utils.botOwner(client)) {
      return;
    }
    const status = args[0];
    const msg = args.slice(1).join(" ");
    client.user.edit({
      status: {
        text: msg,
        presence: status,
      },
    });
    message.channel.sendMessage(
      `Changed status text to "${msg}" and presence to "${status}"`
    );
  } catch (error) {
    console.log(error);
  }
};
