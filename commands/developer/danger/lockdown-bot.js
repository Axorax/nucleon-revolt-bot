const utils = require("../../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (message.authorId != utils.botOwner(client)) {
      return;
    }

    if (global.lockdown) {
      global.commands = new Map(global.commandsSave);
      global.commandsSave = null;
      global.lockdown = false;
      message.channel.sendMessage("✅ | Lockdown mode has been disabled!");
    } else {
      global.commandsSave = new Map(global.commands);
      const dict = global.commands;
      const info = userMsg || "";
      [...dict.keys()].forEach((key) => {
        if (key != "lockdown-bot") {
          dict.set(key, {
            run: (client, msg) => {
              msg.reply(
                "Bot is currently under lockdown. Please try again later! 😅 \n" +
                  info
              );
            },
          });
        }
      });

      global.commands = dict;
      global.lockdown = true;

      message.channel.sendMessage("✅ | Lockdown mode has been enabled!");
    }
  } catch (error) {
    console.log(error);
  }
};
