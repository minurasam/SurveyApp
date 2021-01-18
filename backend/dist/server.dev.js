"use strict";

var express = require('express');

var cors = require('cors');

var mongoose = require('mongoose');

var errorHandler = require('./middleware/error');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json()); //database connection to mongoDB

var uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB Database Connection is Established Succesfully!");
}); //api endpoints 
// const exercisesRouter = require('./routes/exercises');

var userRouter = require('./routes/userRoutes');

var projectRouter = require('./routes/projectRoutes');

var privateRouter = require('./routes/privateRoutes');

var surveyRouter = require('./routes/surveyRoutes');

app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/private', privateRouter);
app.use('/surveys', surveyRouter); // Error Handler (Should be last of middleware)

app.use(errorHandler);
app.listen(port, function () {
  console.log("Server is running in port: ".concat(port));
});
process.on("unhandledRejection", function (err, promise) {
  console.log("Logged Error: $(err)");
  server.close(function () {
    return process.exit(1);
  });
});
module.exports = app;