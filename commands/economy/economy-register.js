const utils = require("../../utils.js");
const mongo = require("../../mongodb.js");
let timeout = [];

module.exports = {
  run: async (client, message) => {
    try {
      let id = message.authorId;
      if (timeout.includes(id)) {
        await message.reply("Command is under cooldown!");
        return;
      }
      const bool = await mongo.exists(id);
      if (bool) {
        message.reply("You are already registered!");
      } else {
        await mongo.check(id);
        message.reply({
          embeds: [
            {
              colour: utils.generateRandomHex(),
              title: `✅ Success`,
              description: `${message.author.username} has been registered to the economy!`,
            },
          ],
        });
      }
      timeout.push(message.authorId);
      setTimeout(() => {
        timeout.shift();
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  },
};
