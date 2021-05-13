const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

var apiRouter = require("./routes/api");

const PORT = process.env.PORT || 8000

// testScore is our database name in mongodb
var connectionString = "mongodb://localhost:27017/socialMediaDB";
// Mongoose setup and config.
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;

mongoose.connect(connectionString, {
}).catch(error => {
  console.error("Error connecting to database", error);
});

const app = express();
app.use(bodyParser.json());

app.use(apiRouter)

app.listen(PORT, () => {
  console.log(`app listening on port:${PORT}`)
})