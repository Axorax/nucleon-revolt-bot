const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    if (String(userMsg).trim().length === 0) {
      message.reply("Provide some text to show beside the radar!");
      return;
    }
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Radar`,
          description: `\`\`\`
      ,-.
     / \\  \`.  __..-,O
    :   \\ --''_..-'.'
    |    . .-' \`. '.
    :     .     .\`.'      ${userMsg}
     \\     \`.  /  ..
      \\      \`.   ' .
       \`,       \`.   \\
      ,|,\`.        \`-.\\
     '.||  \`\`-...__..-\`
      |  |
      |__|
      /||\\
     /\/||\\\\
    /\/ || \\\\
 __/\/__||__\\\\__
'--------------'`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    message.channel.sendMessage("**Invalid command usage!**");
  }
};
