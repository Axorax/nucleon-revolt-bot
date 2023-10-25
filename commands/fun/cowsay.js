const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    let dashes = "-".repeat(String("| " + userMsg + " |").length);
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Cowsay`,
          description: `\`\`\`
 ${dashes}
 | ${userMsg} |
 ${dashes}
        \\   ^__^
         \\  (oo)\\________
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    message.channel.sendMessage("**Invalid command usage!**");
  }
};
