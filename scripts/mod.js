const utils = require("../utils.js");

async function checkMod(client, message, perm) {
  try {
    if (!Boolean(message.channel.server)) {
      message.reply("This command can only be used in a server!");
      return;
    }
    if (!Boolean(message.member.hasPermission(message.channel.server, perm))) {
      message.channel.sendMessage(
        `You need the permisson "${perm}" to use this command!`
      );
      return;
    }
    const bot = await message.channel.server.fetchMember(client.user.id);
    if (!Boolean(bot.hasPermission(message.channel.server, perm))) {
      message.channel.sendMessage(
        `Give the bot permission "${perm}" to ban members!`
      );
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = checkMod;
