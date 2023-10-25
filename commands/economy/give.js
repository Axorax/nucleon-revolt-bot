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
    if (args[0] == undefined || args[1] == undefined) {
      message.reply("Invalid usage!\n?give <user> <amount>");
      return;
    }
    await mongo.check(id);
    const user = await mongo.find(id);
    let amount;
    if (args[1] == "all") {
      amount = user.cash;
    } else {
      amount = parseInt(args[1]);
    }
    if (amount == 0) {
      message.reply("You cannot send 0 cash to someone!");
      return;
    } else if (user.cash < amount) {
      message.reply("Not enough cash!");
      return;
    }
    let receiver = "";
    if (message.mentionIds) {
      receiver = message.mentionIds[0];
    } else if (new RegExp("[0-9A-Z]{26}").test(userMsg)) {
      receiver = userMsg;
    } else {
      message.reply("Invalid user!");
      return;
    }
    await mongo.check(receiver);
    await mongo.update(id, {
      cash: user.cash - amount,
    });
    const receiverInfo = await mongo.find(receiver);
    await mongo.update(receiver, {
      cash: receiverInfo.cash + amount,
    });
    const receiverName = await client.users.get(receiver);
    message.reply(
      `Successfully sent ${amount} cash 💵 to ${receiverName.username}`
    );
    timeout.push(id);
    setTimeout(() => {
      timeout.shift();
    }, 5000);
  } catch (error) {
    message.reply("Invalid usage!\n?give <user> <amount>");
  }
};
