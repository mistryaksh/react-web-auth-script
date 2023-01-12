import mongoose, { Schema, model } from "mongoose";

var userScehma = new Schema({
     email: { type: mongoose.Schema.Types.String, required: true },
     password: { type: mongoose.Schema.Types.String, min: 4, required: true },
});

const User = model("user", userScehma);

export default User;
