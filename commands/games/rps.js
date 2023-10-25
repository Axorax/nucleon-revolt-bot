const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    if (String(userMsg).trim().length === 0) {
      message.channel.sendMessage("**Choice cannot be empty!**");
      return;
    }
    const comp = String(
        utils.randomItemFromArray(["Rock", "Paper", "Scissors"])
      ).toLowerCase(),
      p = userMsg.toLowerCase();
    if (p != "rock" && p != "scissors" && p != "paper") {
      message.channel.sendMessage(
        "**Choice can only be rock, paper or scissors!**"
      );
      return;
    }
    let status = "";
    if (comp == p) {
      status = "drew";
    } else {
      switch (p) {
        case "rock":
          switch (comp) {
            case "paper":
              status = "lost";
              break;
            case "scissors":
              status = "won";
              break;
          }
          break;

        case "paper":
          switch (comp) {
            case "scissors":
              status = "lost";
              break;
            case "rock":
              status = "won";
              break;
          }

        case "scissors":
          switch (comp) {
            case "rock":
              status = "lost";
              break;
            case "paper":
              status = "won";
              break;
          }
          break;
      }
    }
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Rock Paper Scissors 👊✋✌`,
          description: `You chose: ${userMsg}
          Computer chose: ${comp}
          
          **You ${status} the match**`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    message.channel.sendMessage("**Invalid choice by player**");
  }
};
