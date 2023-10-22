const mongoose = require("mongoose")
// const { object } = require("webidl-conversions")

const userData = mongoose.Schema({
    userData:{type: Object}
})

const UserData = mongoose.model("User" , userData)

module.exports = {UserData}