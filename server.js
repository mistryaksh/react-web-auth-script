const Express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = Express();

mongoose.connect("mongodb+srv://test:f9LG4KS19iIfT9ta@cluster0.hoqxjop.mongodb.net/?retryWrites=true&w=majority", {});

app.use(cors());

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

app.listen(8080, () => {
     console.log("server is running...");
});
