var mongo = require("mongoose");

var mongopass = require("passport-local-mongoose");
var schema = new mongo.Schema({
username: String,
password: String
});

schema.plugin(mongopass);

module.exports = new mongo.model("User", schema);
