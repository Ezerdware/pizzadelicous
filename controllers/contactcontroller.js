let nodemailer = require('nodemailer');

function contactcontroller(app) {

    app.get('/contact', async (req, res) => {
        res.render('contact');
    });
    app.post('/contact', async (req, res) => {
        console.log(req.body);
        mailer(req.body);
        res.json('Message sent');
    });


    async function mailer(msg) {

        let message = msg
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: 'pizzaEzGod@gmail.com',
                pass: 'horLAR;;;'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let HelperOptions = {
            from: '"PizzaEzGod"<pizzaEzGod@gmail.com',
            to: 'pizzaEzGod@gmail.com',
            subject: message.contactSubject,
            html: `<h1>Contact Me From pizza</h1><h3>${message.contactMessage}</h3>`
        }

        transporter.sendMail(HelperOptions, (error, info) => {
            if (error) {
                console.log("ERROR while sending email { " + error + " }");
            } else {
                console.log('Email sent  ' + JSON.stringify(info));
            }
        });
    }
}





module.exports = contactcontroller;