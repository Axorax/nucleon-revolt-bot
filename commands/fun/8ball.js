const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    if (String(userMsg).trim().length === 0) {
      message.channel.sendMessage("**Question must be provided!**");
      return;
    }
    const replies = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful.",
    ];
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `8ball`,
          description: `**Question:**
          ${userMsg}
          
          :8ball: ${utils.randomItemFromArray(replies)}`,
        },
      ],
    });
  } catch (error) {
    message.channel.sendMessage("Invalid command usage!");
  }
};
