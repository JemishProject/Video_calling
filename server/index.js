const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDatabase = require("./src/config/database");
const { errorHandler } = require('./src/middleware/ErrorHandler');
const bodyParser = require('body-parser');
const socketIO = require('socket.io')
// database Connection
const routes = require('./src/Routes/index')
connectDatabase()

const app = express();
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost'
}
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors(corsOptions));

app.use('/user', routes);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log("Server is running on", PORT)
});