const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//database connection to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Database Connection is Established Succesfully!");
})

//api endpoints 
// const exercisesRouter = require('./routes/exercises');
// const userRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running in port: ${port}`);
});