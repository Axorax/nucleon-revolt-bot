const userSchema = require("./schemas/user.js");

const mongo = {
  create: async (user_id, cash_amount = 0, items = []) => {
    const user = await userSchema.create({
      id: user_id,
      cash: cash_amount,
      items: items,
    });
    return user;
  },
  check: async (user_id) => {
    const user = await userSchema.exists({ id: user_id });
    if (!user) {
      mongo.create(user_id);
    }
  },
  exists: async (user_id) => {
    const bool = await userSchema.exists({ id: user_id });
    return bool;
  },
  update: async (user_id, data) => {
    const user = await userSchema.findOneAndUpdate({ id: user_id }, data);
    return user;
  },
  find: async (user_id) => {
    const user = await userSchema.findOne({ id: user_id });
    return user;
  },
  clear: async () => {
    await userSchema.deleteMany({});
    return true;
  },
  all: async () => {
    const users = await userSchema.find({});
    return users;
  },
};

module.exports = mongo;
