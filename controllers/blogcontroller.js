function blogcontroller(app){
    
    app.get('/blog', (req, res) => {
        res.render('blog');
    });

    app.get('/blog-single', (req, res) => {
        res.render('blog-single');
    });

    
}

module.exports=blogcontroller;