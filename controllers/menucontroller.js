
function menucontroller(app, db, urlencodedParser) {
    const product =  require('./../models/product')
    const Cart= require('./../models/cart')
 
    app.get('/menu', (req, res) => {
        const dat=product.pizza(db,req, res)
        product.pasta(db,req, res)
        product.burger(db,req, res)
        product.drink(db,req, res)
        console.log(dat)
        res.render('menu', {
            pizza:req.session.pizza,
            pasta:req.session.pasta,
            burger:req.session.burger,
            drink:req.session.drink
        })
       
    });

    app.get('/cart/:name/:id', (req,res)=>{
        console.log(req.params.id);
        console.log(req.params.name);
        var productId=req.params.id;
        var cart= new Cart(req.session.cart ? req.session.cart:{});

        db.all("SELECT * FROM product WHERE name='"+productId+"'", function(err, product){
            if(err){
                console.log(err.message)
                return res.redirect('/menu');
            }
            console.log(product)
                cart.add(product, product.name);
                req.session.cart=cart;
                console.log(req.session.cart);
                res.redirect('/menu')
            
        });
    })

}

module.exports = menucontroller;