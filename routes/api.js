const express = require("express");
const router = express.Router();

router.post("/evaluate", (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    const output = eval(req.body.code);
    res.json({ output });
  } else {
    return res.redirect("/");
  }
});

router.get("/client-ready", (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    const status = req.client.ready() || false;
    if (status == true) {
      return res.json({ status });
    } else {
      return res.json({ status: false });
    }
  } else {
    return res.redirect("/");
  }
});

router.get("/clear-database", (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    req.db.clear();
    res.json({ success: true });
  } else {
    return res.redirect("/");
  }
});

router.post("/dm-all-users", async (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    await req.client.users.forEach(async (user) => {
      const dm = await user.openDM();
      await dm.sendMessage(req.body.message);
    });
    return res.json({ success: true });
  } else {
    return res.redirect("/");
  }
});

router.post("/mass-announcement", async (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    await req.client.channels.forEach(async (channel) => {
      channel.sendMessage(req.body.message);
    });
    return res.json({ success: true });
  } else {
    return res.redirect("/");
  }
});

router.post("/change-status/:presence", async (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    await req.client.user.edit({
      status: {
        text: req.body.message,
        presence: req.params.presence,
      },
    });
    return res.json({ success: true });
  } else {
    return res.redirect("/");
  }
});

router.post("/dm-user/:id", async (req, res) => {
  if (req.query.pin && req.query.pin === req.pin) {
    const { id } = req.params;
    const user = req.client.users.get(id);
    const dm = await user.openDM();
    await dm.sendMessage(req.body.message);
    return res.json({ success: true });
  } else {
    return res.redirect("/");
  }
});

router.get("/checkpin/:pin", (req, res) => {
  if (req.params.pin == req.pin) {
    return res.json({ valid: true });
  } else {
    return res.json({ valid: false });
  }
});

router.get("/uptime", (req, res) => {
  if (req.query.pin && req.query.pin == req.pin) {
    function uptime() {
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      return `${hours} hour${hours == 1 ? "" : "s"}, ${minutes} minute${
        minutes == 1 ? "" : "s"
      }, ${seconds} second${seconds == 1 ? "" : "s"}`;
    }
    return res.json({ uptime: uptime(), raw: process.uptime() });
  } else {
    return res.redirect("/");
  }
});

module.exports = router;
