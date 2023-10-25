const utils = require("../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (String(userMsg).trim() === "") {
      message.reply("Provide a site name!");
      return;
    }
    const request = await fetch('https://api.websitecarbon.com/site?url=' + userMsg)
    const data = await request.json();
    message.channel.sendMessage({
        embeds: [
          {
            colour: utils.generateRandomHex(),
            title: `Website carbon level`,
            description: `URL: \`${userMsg}\`
            Green: \`${data.green}\`
            Bytes: \`${data.bytes}\`
            Energy: \`${data.statistics.energy}\`
            CO2 Grid Grams: \`${data.statistics.co2.grid.grams}\`
            CO2 Grid Litres: \`${data.statistics.co2.grid.litres}\`
            CO2 Renewable Grams: \`${data.statistics.co2.renewable.grams}\`
            CO2 Renewable Litres: \`${data.statistics.co2.renewable.litres}\``,
          },
        ],
      });
  } catch (error) {
    console.log(error)
    message.channel.sendMessage(`**Invalid URL! (or command failed?)**`);
  }
};
