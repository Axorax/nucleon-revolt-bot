const utils = require("../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    const response = await fetch("https://joke.deno.dev/");
    const data = await response.json();
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Random Joke`,
          description: `${data.setup}
      
      ${data.punchline}`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
