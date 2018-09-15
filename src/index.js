import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import auth from './routes/auth';



dotenv.config();
const app = express();
mangoose.Promise = Promise;
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(auth);
  

// Routes which should handle requests
app.use("/api/auth", auth);

app.listen(8080, () => console.log("Running on localhost:8080"));