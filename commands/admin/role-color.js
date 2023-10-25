const utils = require("../../utils.js");

function invalid(message) {
  message.channel.sendMessage({
    embeds: [
      {
        title: "Invalid command usage!",
        description: `**Command usage example:**
\`?role-color role_id color_code(examples; #fff or linear-gradient(45deg,red,blue))\`

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
    if (message.member.hasPermission(message.channel.server, "ManageRole")) {
      if (String(userMsg).trim().length === 0) {
        message.channel.sendMessage(
          "**Provide role id and color code** [#FFFFFF or linear-gradient(45deg, red, blue)]"
        );
        return;
      }

      const bot = await message.channel.server.fetchMember(client.user.id);

      if (bot.hasPermission(message.channel.server, "ManageRole")) {
        if (args[1] == undefined) {
          invalid(message);
          return;
        }
        const serverRoles = await message.channel.server.roles;
        if ([...serverRoles.keys()].includes(args[0])) {
          try {
            const changedRoleColor = await message.channel.server.editRole(
              args[0],
              {
                colour: String(userMsg).replace(`${args[0]} `, ""),
              }
            );
            message.channel.sendMessage(
              `✅ | Successfully changed color for role "${changedRoleColor.name}" to ${changedRoleColor.colour}`
            );
          } catch (error) {
            invalid(message);
          }
        } else {
          message.reply(`The role with id "${args[0]}" does not exist!`);
        }
      } else {
        message.channel
          .sendMessage(`**Bot doesn't have permission to manage roles!**

                    \`Fix: Give the bot the permission "ManageRole"\``);
      }
    } else {
      message.reply(
        `**You need permission "Manage Roles" to use this command!**`
      );
    }
  } catch (error) {
    invalid(message);
    console.log(error);
  }
};
