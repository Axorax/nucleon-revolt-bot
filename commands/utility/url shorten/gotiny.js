const utils = require("../../../utils.js");

module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (userMsg.trim().length === 0) {
      message.reply("Provide a URL to shorten!");
      return;
    }
    const request = await fetch("https://gotiny.cc/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: userMsg }),
    });
    const data = await request.json();
    if (data.error != undefined) {
      message.channel.sendMessage(`**Invalid link!**`);
      return;
    }
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Shorten URL`,
          description: `Long URL: ${data[0].long}
            Short Code: \`${data[0].code}\`
            Short URL: https://gotiny.cc/${data[0].code}`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
