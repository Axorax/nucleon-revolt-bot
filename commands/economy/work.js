const utils = require("../../utils.js");
const mongo = require("../../mongodb.js");
const jobs = require("../../db/jobs.json");
let timeout = [];

module.exports.run = async (client, message, args, userMsg) => {
  try {
    const id = message.authorId;
    if (timeout.includes(id)) {
      await message.reply("Command is under cooldown!");
      return;
    }
    await mongo.check(id);
    const user = await mongo.find(id);
    const cash = utils.randomInteger(5, 20);
    const newCash = user.cash + cash;
    await mongo.update(id, {
      cash: newCash,
    });
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${message.author.username} goes to work!`,
          description: `${
            message.author.username
          } works as a ${utils.randomItemFromArray(
            jobs
          )} and earns \`${cash}\` cash! 💵`,
        },
      ],
    });
    timeout.push(id);
    setTimeout(() => {
      timeout.shift();
    }, 60000);
  } catch (error) {
    console.log(error);
  }
};
