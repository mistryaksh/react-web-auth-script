import Express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import User from "./user.js";
import morgan from "morgan";
import https from "https";
import fs from "fs";

const app = Express();

console.log("app.js is running");

mongoose.set("strictQuery", false);
mongoose.connect(
     "mongodb+srv://test:f9LG4KS19iIfT9ta@cluster0.hoqxjop.mongodb.net/?retryWrites=true&w=majority",

     (err) => {
          if (err) {
               console.log(err);
          } else {
               console.log("connected to database!");
          }
     }
);

app.use(
     cors({
          origin: ["https://react-test-app-1.netlify.app", "http://localhost:3000"],
          optionsSuccessStatus: 200,
     })
);
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

https.createServer({
     key: fs.readFileSync("key.pem"),
     cert: fs.readFileSync("pem/Aakash-node-app.pem"),
}, app).listen(8080, () => {
     console.log('server is running')
});
