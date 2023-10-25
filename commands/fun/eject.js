const utils = require("../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  try {
    if (message.mentionIds) {
      eject(message, client.users.get(message.mentionIds[0]).username);
    } else if (new RegExp("[0-9A-Z]{26}").test(userMsg)) {
      try {
        eject(message, client.users.get(userMsg).username);
      } catch (error) {
        message.channel.sendMessage(`**Failed to get user ID: ${userMsg}**`);
      }
    } else {
      eject(message, client.users.get(message.authorId).username);
    }
  } catch (error) {
    message.channel.sendMessage("**Invalid command usage!**");
  }
};

function eject(message, name) {
  message.channel.sendMessage({
    embeds: [
      {
        colour: utils.generateRandomHex(),
        title: `${name} was ejected`,
        description: `\`\`\`.      　。　　　　•　    　ﾟ　　。
　　.　　　.　　　  　　.　　　　　。　　   。
 　.　　      。　        ඞ   。　    .    •
   •       ${name} was ${utils.randomItemFromArray([
          "not ",
          "",
        ])}the imposter    。　.
　 　　。　　 　　　　ﾟ　　　.　    　.
,　　　　.　 .　　       .      　ﾟ      .            .`,
      },
    ],
  });
}
