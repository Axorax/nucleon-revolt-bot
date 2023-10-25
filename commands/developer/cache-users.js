const utils = require("../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (message.authorId != utils.botOwner(client)) {
      return;
    }
    const m = await message.channel.sendMessage("Starting to cache users ..."),
      userSize = await client.users.size();

    console.log(
      `\x1b[33m[Manual execution ↪] Starting to fetch users in ${client.servers.size()} servers.\x1b[0m`
    );
    const cachedUsers = [];
    client.servers.forEach(async (server) => {
      cachedUsers.push(server.fetchMembers());
    });
    const cacheUserPromise = await Promise.allSettled(cachedUsers);
    console.log(
      `\x1b[92m[Manual execution √] Downloaded all users from ${
        cacheUserPromise.filter((r) => r.status == "fulfilled").length
      } servers ` +
        `with ${
          cacheUserPromise.filter((r) => r.status == "rejected").length
        } errors. Cache size: ${userSize}\x1b[0m`
    );

    m.edit({
      content: `✅ | Finished caching users! Cache size: ${userSize}`,
    });
  } catch (error) {
    console.log(error);
  }
};
