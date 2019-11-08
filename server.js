const express = require('express');
const bodyParser = require('body-parser');
const cookieParser= require('cookie-parser');
const session= require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const multer = require('multer');
const nodemailer=require('nodemailer');

// database initialization
var sqlite3 = require('sqlite3')

var db = new sqlite3.Database('./databases/pizzaDB.db', (err) => {
    if (!err) {
        console.log('connected to pizzaDB');

    } else {
        console.log(err);
    }
});



const app = express();
var jsonParser = bodyParser.json();
app.use(express.json())
app.set('view engine', 'ejs');
app.use('/staticfiles', express.static('staticfiles'));


var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
//express session helper for production
const store = new KnexSessionStore({
    clearInterval:1000 * 60 * 60 * 4
  }); // defaults to a sqlite3 database
  

//setting up express session
app.set('trust proxy', 1)
app.use(session({
    store: store,
    secret:"ezerd",
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:1000 * 60 * 60 * 4, secure:true}
}));

app.use(cookieParser());

// declaration of global vars
app.use(function(req, res, next){
    res.locals.session=req.session;
    next();
})

const logincontroller = require('./controllers/logincontroller');
const indexcontroller = require('./controllers/indexcontroller');
const aboutcontroller = require('./controllers/aboutcontroller');
const blogcontroller = require('./controllers/blogcontroller');
const contactcontroller = require('./controllers/contactcontroller');
const menucontroller = require('./controllers/menucontroller');
const servicescontroller = require('./controllers/servicescontroller');
const checkoutcontroller = require('./controllers/checkoutcontroller');
const thankscontroller = require('./controllers/thankscontroller');
const registercontroller = require('./controllers/registercontroller');
const cartcontroller = require('./controllers/cartcontroller');
const admincontroller = require('./controllers/admincontroller');



logincontroller(app, db, urlencodedParser);
indexcontroller(app);
aboutcontroller(app);
blogcontroller(app);
contactcontroller(app, jsonParser, urlencodedParser);
menucontroller(app, db, urlencodedParser);
servicescontroller(app);
checkoutcontroller(app);
thankscontroller(app);
registercontroller(app, db, urlencodedParser);
cartcontroller(app,db , urlencodedParser);
admincontroller(app, db, urlencodedParser)

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log('App listening on port ' + port);
    }
});


//session checker function
setInterval(function () {
    store.length().then(function (length) {
        console.log('There are ' + JSON.stringify(length) + ' sessions');
    })
}, 10000);