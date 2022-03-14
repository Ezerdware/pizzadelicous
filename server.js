require('dotenv').config()
const express = require('express');
const session= require('express-session');
let memorystore = require('memorystore')(session)
let nanoid = require('nanoid')
const sqlite3 = require('sqlite3')

// db setup
var db = new sqlite3.Database('./databases/pizzaDB.db', (err) => {
    if (!err) {
        console.log('connected to pizzaDB');

    } else {
        console.log(err);
    }
});



const app = express();
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use('/staticfiles', express.static('staticfiles'));


async function sessionSettings(app){

    if (app.get('env') === 'production') {
        app.use(session({
    
            genid: (req) => { return nanoid.nanoid(100) },
            name: 'Pizza Frontend Production',
            store: new memorystore({
                checkPeriod: 1000 * 60 * 60
            }),
            secret: `${process.env.SESSION_KEY}`,
            resave: true,
            saveUninitialized: true,
            cookie: { path: '/', httpOnly: false, secure: false, maxAge: 1000 * 60 * 60}
        }))
    }
    
    if (app.get('env') === 'development') {
        app.use(session({
    
            genid: (req) => { return nanoid.nanoid(100) },
            name: 'Pizza Frontend Development',
            store: new memorystore({
                checkPeriod: 1000 * 60 * 60
            }),
            secret: `${process.env.SESSION_KEY}`,
            resave: true,
            saveUninitialized: true,
            cookie: { path: '/', httpOnly: false, secure: false, maxAge: 1000 * 60 * 60}
        }))
    }
    
    if (app.get('env') === 'staging') {
        app.use(session({
    
            genid: (req) => { return nanoid.nanoid(100) },
            name: 'Pizza Frontend Staging',
            store: new memorystore({
                checkPeriod: 1000 * 60 * 60
            }),
            secret: `${process.env.SESSION_KEY}`,
            resave: true,
            saveUninitialized: true,
            cookie: { path: '/', httpOnly: false, secure: false, maxAge: 1000 * 60 * 60}
        }))
    }
    
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        next();
    })
    
    
    app.use((req, res, next) => {    
        res.locals.session = req.session;
        next();
    })
    

}

sessionSettings(app)

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



logincontroller(app, db);
indexcontroller(app);
aboutcontroller(app);
blogcontroller(app);
contactcontroller(app);
menucontroller(app, db);
servicescontroller(app);
checkoutcontroller(app);
thankscontroller(app);
registercontroller(app, db);
cartcontroller(app,db );
admincontroller(app, db)

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log('App listening on port ' + port);
    }
});