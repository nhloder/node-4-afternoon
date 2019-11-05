require("dotenv").config();
const express = require("express");
const session = require("express-session");
const midware = require('./middlewares/checkForSession');
const swagCtrl = require('./controllers/swagController');
const authCtrl = require('./controllers/authController.js');
const cartCtrl = require('./controllers/cartController.js');
const searchCtrl = require('./controllers/searchController.js')
const { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();

//TOP LEVEL MIDDLEWARE:
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(midware.sessionChecker)

app.use(express.static(`${__dirname}/../build`))
// ^^^ I have no idea what this is or how it works

//ENDPOINTS
// SEARCH \\
app.get('/api/search', searchCtrl.search)

// CART \\
app.post('/api/cart/:id',cartCtrl.checkout);
app.post('/api/cart/:id',cartCtrl.add);
app.delete('/api/cart/:id',cartCtrl.delete)

// AUTH \\
app.post('/api/login',authCtrl.login);
app.post('/api/register',authCtrl.register);
app.post('/api/signout', authCtrl.signOut);
app.get('/api/user',authCtrl.getUser);

// SWAG \\
app.get('/api/swag', swagCtrl.read);

app.listen(SERVER_PORT, () => { console.log(`Bruh, when are they gonna release Andre ${SERVER_PORT}?`)})