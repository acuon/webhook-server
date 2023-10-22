const mongoose = require("mongoose")

const userData = mongoose.Schema({
    userData: String
})

const UserData = mongoose.model("UserData" , userData)

module.exports = {UserData}