const mongoose = require("mongoose");

var userScehma = new mongoose.Schema({
     email: { type: mongoose.Schema.Types.String, required: true },
     password: { type: mongoose.Schema.Types.String, min: 4, required: true },
});

const User = mongoose.model("user", userScehma);

export default User;
