var registerModel= require('../models/registerModel');
module.exports= async function(app, db, urlencodedParser){
    app.get('/register', async function(req,res){
        res.render('register');
    });
    app.post('/register', urlencodedParser, async function(req,res){
        registerModel(db, req.body, res);
    });
};