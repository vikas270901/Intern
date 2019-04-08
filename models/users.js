var mongo = require("mongoose");

var schema = new mongo.Schema({
name: {type:String, default:'Medapp.in'},
username: {type:String, default:'Admin'},
date: {type:Date, default:Date.now()},
pdf: {type:String, default:'./public/pdf.pdf'},
status:	{type:Boolean, default:true},
});

module.exports = new mongo.model("signup", schema);
