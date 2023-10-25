const utils = require("../../utils.js");
module.exports.run = async (client, message) => {
  try {
    if (!Boolean(message.channel.server)) {
      message.reply("This command can only be used in a server!");
      return;
    }
    if (
      !Boolean(
        message.member.hasPermission(message.channel.server, "AssignRoles")
      )
    ) {
      message.channel.sendMessage(
        `You need the permisson "Assign Roles" to use this command!`
      );
      return;
    }
    const bot = await message.channel.server.fetchMember(client.user.id);
    if (!Boolean(bot.hasPermission(message.channel.server, "AssignRoles"))) {
      message.channel.sendMessage(
        `Give the bot permission "AssignRoles" to mute members!`
      );
      return;
    }
    if (!Boolean(message.mentionIds)) {
      message.reply(`Mention a user to mute!`);
      return;
    }
    try {
      let id = "";
      const serverRoles = await message.channel.server.roles;
      [...serverRoles.keys()].forEach((e) => {
        if (serverRoles.get(e).name == "Muted") {
          id = e;
          return false;
        }
        return true;
      });
      if (id == "") {
        message.reply(`A role named "Muted" does not exist!`);
        return;
      }
      const member = await message.channel.server.fetchMember(
        message.mentionIds[0]
      );
      const roles = member.roles || [];
      roles.push(id);

      member
        .edit({
          roles: roles,
        })
        .then((e) => {
          message.reply(`<@${message.mentionIds[0]}> has been muted!`);
        })
        .catch((e) => {
          message.reply(`**Invalid role settings**

        Perhaps the muted role has an equivalent or higher role rank than the bot.

        [For any help to setup this command you can check the support server!](https://app.revolt.chat/invite/01GVK81S6KZJF5E0EVDGD75AHH)`);
        });
    } catch (e) {
      console.log(e);
    }
  } catch (error) {
    message.channel.sendMessage("Invalid command usage!");
    console.log(error);
  }
};
