const mongoose = require("mongoose");

const schema = mongoose.Schema({
	login: 'String',
	password: 'String',
	tocken: "",
})

module.exports = mongoose.model("User", schema);