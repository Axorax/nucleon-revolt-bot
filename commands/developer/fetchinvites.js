const utils = require("../../utils.js");

module.exports.run = async (client, message, args, userMsg) => {
  const ERROR = "Invalid usage!";
  try {
    if (message.authorId != utils.botOwner(client)) {
      return;
    }
    if (args[0] == undefined) {
      message.reply(ERROR);
      return;
    }
    const server = await client.servers.fetch(args[0]);
    const bot = await message.channel.server.fetchMember(client.user.id);
    if (!Boolean(bot.hasPermission(server, "ManageServer"))) {
      message.reply("Bot is missing manage server permission in that server!");
      return;
    }
    const invites = await server.fetchInvites();
    let msg = `| Invite | Type | Server | Creator | Channel |
| --- | --- | --- | --- | --- |\n`;
    invites.forEach((e) => {
      msg += `| ${e.id} | ${e.type} | ${e.serverId} | ${e.creatorId} | ${e.channelId} |\n`;
    });
    message.reply(msg.slice(0, -2));
  } catch (error) {
    message.reply(ERROR);
    console.log(error);
  }
};
