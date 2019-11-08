function indexcontroller(app){
    
    app.get('/', (req, res) => {
        res.render('index');
    });
}

module.exports=indexcontroller;