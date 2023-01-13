import Express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import User from "./user.js";

import morgan from "morgan";

const app = Express();
mongoose.set("strictQuery", false);
mongoose.connect(
     "mongodb+srv://test:f9LG4KS19iIfT9ta@cluster0.hoqxjop.mongodb.net/?retryWrites=true&w=majority",

     (err) => {
          if (err) {
               console.log(err);
          }
     }
);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
     return res.status(200).json({
          message: "Try post request for more response",
     });
});

app.post("/", async (req, res) => {
     const { email, password } = req.body;
     const user = await User.findOne({ email: email });

     if (!email || !password) {
          return res.status(401).json({
               message: "email and password are not provided",
          });
     }

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
     next();
});

app.listen(8000);
