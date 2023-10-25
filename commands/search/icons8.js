const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    if (String(userMsg).trim() === "") {
      message.reply("Enter a query to search for!");
      return;
    }
    message.channel.sendMessage({
      content: `[ ](https://img.icons8.com/${encodeURIComponent(userMsg)})`,
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Icon from icons8`,
          description: `**Search Query:** \`${userMsg}\`
**Icon Link:** [Click here](https://img.icons8.com/${encodeURIComponent(
            userMsg
          )})
        
If you don't see an image below this message then that icon doesn't exist!`,
        },
      ],
    });
  } catch (error) {
    message.channel.sendMessage(`**Command failed!**`);
  }
};
