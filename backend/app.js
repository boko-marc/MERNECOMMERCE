const express = require('express');
bodyParser = require('body-parser'),
  cors = require('cors');
  var morgan = require('morgan')

// serveur
const app = express();
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
var corsOptions = {
  origin: process.env.corsOrigin,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ message: "E-commerce MERN API" })
})
// erreur cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// users routes
const UserRoute = require('./Routes/usersRoutes')
app.use('/users', UserRoute)

// products routes
const productRoute = require('./Routes/productRoute')
app.use('/products', productRoute)

module.exports = app;