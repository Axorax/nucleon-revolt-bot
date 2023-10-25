const utils = require("../../utils.js");
const mongo = require("../../mongodb.js");
let timeout = [];

module.exports = {
  run: async (client, message, args, userMsg) => {
    try {
      let id = message.authorId;
      if (timeout.includes(id)) {
        await message.reply("Command is under cooldown!");
        return;
      }
      if (message.mentionIds) {
        id = message.mentionIds[0];
      } else if (new RegExp("[0-9A-Z]{26}").test(userMsg)) {
        id = userMsg;
      }
      await mongo.check(id);
      const user = await mongo.find(id);
      const name = await client.users.get(id);
      message.reply({
        embeds: [
          {
            colour: utils.generateRandomHex(),
            title: `${name.username}'s cash amount`,
            description: `${name.username} has \`${user.cash}\` cash! 💵`,
          },
        ],
      });
      timeout.push(message.authorId);
      setTimeout(() => {
        timeout.shift();
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  },
  alias: ["bal"],
};
