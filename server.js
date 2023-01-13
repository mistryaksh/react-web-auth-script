import Express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import User from "./user.js";
import http from "http";

import morgan from "morgan";

const app = Express();

mongoose.set("strictQuery", false);
mongoose.connect(
     "mongodb+srv://test:f9LG4KS19iIfT9ta@cluster0.hoqxjop.mongodb.net/?retryWrites=true&w=majority",

     (err) => {
          if (err) {
               console.log(err);
          } else {
               console.log("connected to database...");
          }
     }
);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/", async (req, res) => {
     const { email, password } = req.body;
     const user = await User.findOne({ email: email });

     if (!user) {
          return res.status(401).json({
               message: "No user found with this email",
          });
     }

     if (user.password !== password) {
          return res.status(401).json({
               message: "You give us a wrong passowrd",
          });
     }

     return res.status(200).json({
          message: `logged in with user ${user.email}`,
     });
});

app.use(function (req, res, next) {
     if (res.status(404)) {
          res.status(404).json({
               message: "No page found",
          });
     }
});

http.createServer(app).listen(8080, () => {
     console.log("server is connected...");
});
