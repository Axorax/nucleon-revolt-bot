const utils = require("../../utils.js");

function invalid(message) {
  message.channel.sendMessage({
    embeds: [
      {
        title: "Invalid command usage!",
        description: `**Command usage example:**
\`?role-hide <role-id>\`

*Note:* Ensure that the bot has the "ManageRole" permission!`,
      },
    ],
  });
}

module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (!Boolean(message.channel.server)) {
      message.reply("This command can only be used in a server!");
      return;
    }
    if (
      !Boolean(
        message.member.hasPermission(message.channel.server, "ManageRole")
      )
    ) {
      message.reply(
        `**You need permission "Manage Roles" to use this command!**`
      );
      return;
    }
    if (String(userMsg).trim().length === 0) {
      message.channel.sendMessage(
        "**Provide role id and color code** [#FFFFFF or linear-gradient(45deg, red, blue)]"
      );
      return;
    }

    const bot = await message.channel.server.fetchMember(client.user.id);

    if (!Boolean(bot.hasPermission(message.channel.server, "ManageRole"))) {
      message.channel.sendMessage(
        `**Bot doesn't have permission to manage roles!**\n\n\`Fix: Give the bot the permission "ManageRole"\``
      );
      return;
    }
    if (args[0] == undefined) {
      invalid(message);
      return;
    }

    const serverRoles = await message.channel.server.roles;
    if (!Boolean([...serverRoles.keys()].includes(args[0]))) {
      message.reply(`The role with id "${args[0]}" does not exist!`);
    }
    try {
      const changedRoleColor = await message.channel.server.editRole(args[0], {
        colour: "transparent",
      });
      message.channel.sendMessage(
        `✅ | Successfully made role "${changedRoleColor.name}" invisible!`
      );
    } catch (error) {
      invalid(message);
    }
  } catch (error) {
    invalid(message);
    console.log(error);
  }
};
