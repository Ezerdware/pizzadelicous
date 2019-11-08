function aboutcontroller(app){
    
    app.get('/about', (req, res) => {
        res.render('about');
    });
}

module.exports=aboutcontroller;