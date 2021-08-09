const mongoose = require("mongoose");
const { mongoPath } = require("./config.json");

require('dotenv').config()

module.exports = async () => {
    await mongoose.connect(process.env.MONGOPath, {

    });
    return mongoose;
}