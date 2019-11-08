
module.exports = async function (app, db, urlencodedParser) {
    app.get('/cart', async (req, res) => {
        res.render('cart');
    });
    app.get('/api/cart/:idd', async (req, res) => {
        
    });
    app.delete('/api/cart/:idd', (req, res) => {
    });
    app.get('/api/cart/deliverydetails/:idd', (req, res) => {
    });
    
};