function servicescontroller(app){
    
    app.get('/services', (req, res) => {
        res.render('services');
    });
}

module.exports=servicescontroller;