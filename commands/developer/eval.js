const utils = require("../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (message.authorId == utils.botOwner(client)) {
      try {
        const result = await eval(userMsg);
        message.reply({
          embeds: [
            {
              colour: utils.generateRandomHex(),
              title: "Evaluate",
              description: `**Input Code:**
                  ${userMsg}

                  **Type of:** \`${typeof result}\`
                  
                  **Output:**
                  ${String(result)}`,
            },
          ],
        });
      } catch (error) {
        message.reply({
          embeds: [
            {
              colour: utils.generateRandomHex(),
              title: "Evaluate",
              description: `**Input Code:**
                  ${userMsg}
                  
                  **Error Found:**
                  ${error}`,
            },
          ],
        });
      }
    } else {
      return;
    }
  } catch (error) {
    console.log(`Error with shutdown.js:\n ${error}`);
  }
};
