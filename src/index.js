import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import auth from './routes/auth';


const app = express();
mongoose.connect('mongodb://localhost/gameboard', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(auth);
  

// Routes which should handle requests
app.use("/api/auth", auth);

app.listen(8080, () => console.log("Running on localhost:8080"));