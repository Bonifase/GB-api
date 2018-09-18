import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from "cors";
import Promise from 'bluebird';
import auth from './routes/auth';
import users from './routes/users';



dotenv.config();
const app = express();
app.use(cors());
// mangoose.Promise = Promise;
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(auth);
  

// Routes which should handle requests
app.use("/api/auth", auth);
app.use("/api/users", users);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
app.listen(5000, () => console.log("Running on https://web-game-board-api.herokuapp.com:5000"));