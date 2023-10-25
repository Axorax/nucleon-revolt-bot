const utils = require("../../utils.js");
const mongo = require("../../mongodb.js");
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
    const cash = utils.randomInteger(1, 6);
    const newCash = user.cash + cash;
    await mongo.update(id, {
      cash: newCash,
    });
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${message.author.username} resorts to begging 😔`,
          description: `${message.author.username} begs at the side of the street and earns \`${cash}\` cash! 💵`,
        },
      ],
    });
    timeout.push(id);
    setTimeout(() => {
      timeout.shift();
    }, 40000);
  } catch (error) {
    console.log(error);
  }
};
