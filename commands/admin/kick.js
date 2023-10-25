const utils = require("../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (!Boolean(message.channel.server)) {
      message.reply("This command can only be used in a server!");
      return;
    }
    if (
      !Boolean(
        message.member.hasPermission(message.channel.server, "KickMembers")
      )
    ) {
      message.channel.sendMessage(
        `You need the permisson "Kick Members" to use this command!`
      );
      return;
    }
    const bot = await message.channel.server.fetchMember(client.user.id);
    if (!Boolean(bot.hasPermission(message.channel.server, "KickMembers"))) {
      message.channel.sendMessage(
        `Give the bot permission "Kick Members" to kick members!`
      );
      return;
    }
    try {
      let member = message.mentionIds
        ? await message.channel.server.fetchMember(message.mentionIds[0])
        : /[0-9A-Z]{26}/.test(userMsg)
        ? await message.channel.server.fetchMember(userMsg)
        : null;
      if (member == null) return message.reply("Ping someone or enter an ID!");
      member.kick().then((e) => {
        message.reply(
          `✅ | <@${member.id.user}> has been kicked from the server!`
        );
      });
    } catch (e) {
      console.log(e);
    }
  } catch (error) {
    message.channel.sendMessage("Invalid command usage!");
    console.log(error);
  }
};
