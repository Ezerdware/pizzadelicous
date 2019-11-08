function checkoutcontroller(app){
    
    app.get('/checkout', (req, res) => {
        res.render('checkout');
    });
}

module.exports=checkoutcontroller;