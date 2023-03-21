// after hitting npm install express cors mongoose dotenv in terminal
// configure it

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const exerciseRouter = require("./routes/exercise");

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// initialize port
const app = express();
const port = process.env.port || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/exercise", exerciseRouter);

// server listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
