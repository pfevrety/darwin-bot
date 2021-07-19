const mongoose = require("mongoose");

const commandPrefixSchema = mongoose.Schema({
  // Guild ID
  _id: {
    type: Number,
    required: true,
  },

  prefix: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("guild-prefixes", commandPrefixSchema);
