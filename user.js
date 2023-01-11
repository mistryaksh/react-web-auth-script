import mongoose, { Schema, model } from "mongoose";

mongoose.connect(
     "mongodb+srv://test:f9LG4KS19iIfT9ta@cluster0.hoqxjop.mongodb.net/?retryWrites=true&w=majority",
     {},
     (err) => {
          if (err) {
               console.log(err);
          } else {
               console.log("connected to database...");
          }
     }
);

var userScehma = new Schema({
     email: { type: mongoose.Schema.Types.String, required: true },
     password: { type: mongoose.Schema.Types.String, min: 4, required: true },
});

const User = model("user", userScehma);

export default User;
