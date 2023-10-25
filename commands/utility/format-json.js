const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    if (userMsg.trim().length === 0) {
      message.reply("**Provide JSON to format!**");
      return;
    }
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Format JSON`,
          description: `\`\`\`json
${JSON.stringify(JSON.parse(userMsg), null, 4)}
\`\`\``,
        },
      ],
    });
  } catch (error) {
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: "Invalid JSON!",
          description: `${error}`,
        },
      ],
    });
  }
};
