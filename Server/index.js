const express = require("express");
const connectDB = require("./config/Db");
const passport = require("passport");
require("./config/passport")
const MongoStore = require("connect-mongo");
const session = require("express-session");
const authroutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
  methods: ["GET", "POST"],
  credentials: true,
}));

connectDB();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 60 * 60, // 7 days
}),
  cookie: {
    maxAge: 60 * 60 * 1000, 
    
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

