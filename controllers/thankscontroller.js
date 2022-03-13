module.exports=(app)=>{
    
    app.get('/thanks', (req, res) => {
        res.render('thanks');
    });
};