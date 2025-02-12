const express = require("express");
const connectDB = require("./config/Db");
const passport = require("passport");
require("./config/passport")
const session = require("express-session");
const authroutes = require("./routes/auth");
require("dotenv").config();
const cors = require("cors");
const app = express();


const allowedOrigins = [
  "http://localhost:3000"
];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST"]
}));

connectDB();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 *60 * 1000, 
  },
}));


app.use(passport.initialize());
app.use(passport.session());




app.use("/auth", authroutes);

const port = process.env.PORT;
app.get("/",(req,res)=>{
  res.json({success : true, message : "Welcome to the server"});
})
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

