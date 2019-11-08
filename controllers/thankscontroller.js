function thankscontroller(app){
    
    app.get('/thanks', (req, res) => {
        res.render('thanks');
    });
}

module.exports=thankscontroller;