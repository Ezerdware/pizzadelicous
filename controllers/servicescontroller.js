module.exports=(app)=>{
    
    app.get('/services', (req, res) => {
        res.render('services');
    });
    
};