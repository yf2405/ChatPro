const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/useRoutes');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("db Connection Success");
    })
    .catch((err) => {
        console.log("Error: " + err.message)
    });

app.listen(process.env.PORT, () => {
    console.log(`server Started on Port ${process.env.PORT}`);
})