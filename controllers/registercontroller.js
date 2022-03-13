var registerModel= require('../models/registerModel');
module.exports= async function(app, db){
    app.get('/register', async function(req,res){
        res.render('register');
    });
    app.post('/register', async function(req,res){
        registerModel(db, req.body, res);
    });
};