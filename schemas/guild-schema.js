const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true
}

const reqBoolean = {
    type: Boolean,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

const guildSchema = mongoose.Schema({
    _id: reqString,
    prefix: reqString,
    language: reqString,
    welcomeMessage: reqString,
    invite_leaderboard: reqBoolean,
    xpSystem: reqBoolean,
    xpRate: reqNumber
})

module.exports = mongoose.model('guild', guildSchema)