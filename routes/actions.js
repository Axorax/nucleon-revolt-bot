const express = require("express");
const router = express.Router();

router.get("/cache-users", async (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    console.log(
      `\x1b[33m[↪] Starting to fetch users in ${req.client.servers.size()} server(s).\x1b[0m`
    );
    const cachedUsers = [];
    req.client.servers.forEach(async (server) => {
      cachedUsers.push(server.fetchMembers());
    });
    const cacheUserPromise = await Promise.allSettled(cachedUsers);
    console.log(
      `\x1b[92m[√] Downloaded all users from ${
        cacheUserPromise.filter((r) => r.status == "fulfilled").length
      } server(s) ` +
        `with ${
          cacheUserPromise.filter((r) => r.status == "rejected").length
        } errors. Cache size: ${req.client.users.size()}\x1b[0m`
    );
    return res.json({ success: true });
  } else {
    return res.redirect("/");
  }
});

router.get("/ws-reconnect", async (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    await req.client.events.disconnect();
    await req.client.events.connect();
    return res.json({ success: true });
  } else {
    return res.redirect("/");
  }
});

router.get("/shutdown", async (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    process.exit();
  } else {
    return res.redirect("/");
  }
});

router.get("/lockdown", async (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    if (global.lockdown) {
      global.commands = new Map(global.commandsSave);
      global.commandsSave = null;
      global.lockdown = false;
    } else {
      global.commandsSave = new Map(global.commands);
      const dict = global.commands;
      [...dict.keys()].forEach((key) => {
        if (key != "lockdown-bot") {
          dict.set(key, {
            run: (client, msg) => {
              msg.reply(
                "Bot is currently under lockdown. Please try again later! 😅"
              );
            },
          });
        }
      });

      global.commands = dict;
      global.lockdown = true;

      // message.channel.sendMessage("✅ | Lockdown mode has been enabled!");
    }
    return res.json({ success: true, lockdown: global.lockdown });
  } else {
    return res.redirect("/");
  }
});

module.exports = router;
