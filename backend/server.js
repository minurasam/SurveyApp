const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//database connection to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Database Connection is Established Succesfully!");
})

//api endpoints 
// const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const privateRouter = require('./routes/privateRoutes');
const surveyRouter = require('./routes/surveyRoutes');

app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/private', privateRouter);
app.use('/surveys', surveyRouter);

// Error Handler (Should be last of middleware)
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server is running in port: ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: $(err)`);
    server.close(() => process.exit(1));
});


module.exports = app;