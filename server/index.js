const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("db Connection Success");
    })
    .catch((err) => {
        console.log("Error: " + err.message)
    });

