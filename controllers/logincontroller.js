const loginModel=require('../models/loginModel')

module.exports = async function (app, db) {
    
    app.get('/login', async (req, res) => {
        res.render('login');
    });

    app.post('/login', async (req, res) => {
        loginModel(db, req.body, res);
        // save user detail to the a global session variable
    });

    app.get('/logout', async (req, res) => {
        // remove user detail to the a global session variable
        res.redirect('/login')
    });
}