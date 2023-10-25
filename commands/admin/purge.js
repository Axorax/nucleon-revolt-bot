const utils = require("../../utils.js");
let timeout = [];

module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (timeout.includes(message.authorId)) {
      await message.reply("Command is under cooldown!");
      return;
    }
    if (
      message.member.hasPermission(message.channel.server, "ManageMessages")
    ) {
      const bot = await message.channel.server.fetchMember(client.user.id);
      const number = String(userMsg).trim();
      const limit = Number(number);
      if (number.length === 0) {
        message.reply("**Provide a number of messages to delete!**");
        return;
      } else if (limit > 1000) {
        message.reply(
          "This command is under-development. Maybe keep the amount less than 11?"
        );
        return;
      }

      if (bot.hasPermission(message.channel.server, "ManageMessages")) {
        let ids = [];
        message.channel
          .fetchMessages({
            limit,
            sort: "Latest",
          })
          .then((msgs) => {
            msgs.forEach((e) => {
              ids.push(e.id);
            });
          })
          .then((data) => {
            message.channel.deleteMessages(ids);
          });

        timeout.push(message.authorId);
        setTimeout(() => {
          timeout.shift();
        }, 5000);
      } else {
        message.channel
          .sendMessage(`**Bot doesn't have permission to delete messages!**

                    \`Fix: Give the bot the permission "ManageMessages"\``);
      }
    } else {
      message.reply(
        `**You need permission "ManageMessages" to use this command!**`
      );
    }
  } catch (error) {
    message.channel.sendMessage("An error occured!");
  }
};
