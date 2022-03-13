
function menucontroller(app, db) {
    const product =  require('./../models/product')
    const Cart= require('./../models/cart')
 
    app.get('/menu', (req, res) => {
        res.render('menu', {
            pizza:[],
            pasta:[],
            burger:[],
            drink:[]
        })
       
    });

    app.get('/cart/:name/:id', (req,res)=>{
        console.log(req.params.id);
        console.log(req.params.name);
        
    })

}

module.exports = menucontroller;