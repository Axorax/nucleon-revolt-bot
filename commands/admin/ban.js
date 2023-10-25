const utils = require("../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (!Boolean(message.channel.server)) {
      message.reply("This command can only be used in a server!");
      return;
    }
    if (
      !Boolean(
        message.member.hasPermission(message.channel.server, "BanMembers")
      )
    ) {
      message.channel.sendMessage(
        `You need the permisson "Ban Members" to use this command!`
      );
      return;
    }
    const bot = await message.channel.server.fetchMember(client.user.id);
    if (!Boolean(bot.hasPermission(message.channel.server, "BanMembers"))) {
      message.channel.sendMessage(
        `Give the bot permission "Ban Members" to ban members!`
      );
      return;
    }
    try {
      let member, reason;
      if (message.mentionIds) {
        member = await message.channel.server.fetchMember(
          message.mentionIds[0]
        );
        args.shift();
        const x = args.join(" ");
        reason = x.replaceAll(" ", "") == "" ? null : x;
      } else if (/[0-9A-Z]{26}/.test(userMsg)) {
        member = await message.channel.server.fetchMember(userMsg);
        args.shift();
        const x = args.join(" ");
        reason = x.replaceAll(" ", "") == "" ? null : x;
      } else {
        member = null;
      }
      if (member == null) return message.reply("Ping someone or enter an ID!");
      member.ban({ reason: reason }).then((e) => {
        message.reply(
          `✅ | <@${member.id.user}> has been banned from the server!`
        );
      });
    } catch (e) {
      message.channel.sendMessage("Invalid command usage!");
      console.log(e);
    }
  } catch (error) {
    message.channel.sendMessage("Invalid command usage!");
    console.log(error);
  }
};
