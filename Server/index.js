const express = require("express");
const connectDB = require("./config/Db");
const passport = require("passport");
require("./config/passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const authroutes = require("./routes/auth");

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST"],
  credentials: true,
}));

connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/auth", authroutes);

const port = process.env.PORT;
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to the server" });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
