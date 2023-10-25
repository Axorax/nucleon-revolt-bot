const utils = require("../../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (Boolean(message.channel.server)) {
      const description = String(message.channel.server.description);
      const memberCount = await message.channel.server.fetchMembers();
      message.channel.sendMessage({
        embeds: [
          {
            colour: utils.generateRandomHex(),
            title: `Server Information for ${message.channel.server.name}`,
            description: `**Server Name:** \`${message.channel.server.name}\`
        **Server ID:** \`${message.channel.server.id}\`
        **Created at:** \`${new Date(
          message.channel.server.createdAt
        ).toLocaleString()}\`
        **NSFW:** \`${message.channel.server.nsfw == null ? "False" : "True"}\`
        **Owner:** ${message.channel.server.owner}
        **Members:** \`${memberCount.members.length}\`
        **Description:** \`${
          description == null || description == "" ? "None" : description
        }\`
        **Roles:** \`${
          Object.keys([...message.channel.server.roles.keys()] || []).length
        }\`
        **Channels:** \`${
          Object.keys(message.channel.server.channels || []).length
        }\``,
          },
        ],
      });
    } else {
      message.reply("This command can only be used in a server!");
    }
  } catch (error) {
    console.log(error);
  }
};

// Object.keys(message.channel.server.member || []).length
