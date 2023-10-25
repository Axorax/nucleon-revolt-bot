const utils = require("../../utils.js");
const run = async (client, message, args, userMsg) => {
  try {
    if (userMsg) {
      const a = userMsg.split(":i:");
      const reactions = [
        "1️⃣",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
        "7️⃣",
        "8️⃣",
        "9️⃣",
        "🅰️",
        "🅱️",
        "Ⓜ️",
        "🅿️",
        "*️⃣",
        "#️⃣",
      ];
      if (a.length > Number(reactions.length + 1)) {
        message.channel.sendMessage(
          `**Choices cannot be more than ${reactions.length}**`
        );
        return;
      }
      const question = a.shift();
      let choices = ``;
      for (let i = 0; i < a.length; i++) {
        choices += `${reactions[i]} - ${a[i]}\n`;
      }
      let msg = await message.channel.sendMessage({
        embeds: [
          {
            colour: utils.generateRandomHex(),
            title: `Poll`,
            description: `**Question**
            ${question}
            
            **Choices**
            ${choices}`,
          },
        ],
      });
      for (let k = 0; k < a.length; k++) {
        await msg.react(encodeURIComponent(reactions[k]));
      }
    } else {
      message.channel.sendMessage("Provide a question and options!");
    }
  } catch (error) {
    message.channel.sendMessage("This command is under-development!");
  }
};

module.exports = {
  run,
};
