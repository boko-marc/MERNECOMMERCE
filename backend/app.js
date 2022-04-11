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
const UserRoute = require('./Routes/userRoute')
app.use('/users', UserRoute)

// brand routes
const BrandRoute = require('./Routes/brandRoute')
app.use('/brand', BrandRoute)

//cart routes
const CartRoute = require('./Routes/cartRoute')
app.use('/cart', CartRoute)

//category routes
const CategoryRoute = require('./Routes/categoryRoute')
app.use('/category', CategoryRoute)

// products routes
const ProductRoute = require('./Routes/productRoute')
app.use('/product', ProductRoute)

// collections routes
const CollectionRoute = require('./Routes/collectionRoute')
app.use('/collection', CollectionRoute)

//orders routes
const OrderRoute = require('./Routes/ordersRoute')
app.use('/order', OrderRoute)


// whislist routes
const wishRoute = require('./Routes/wishlistRoute')
app.use('/wishlist',wishRoute)
module.exports = app;