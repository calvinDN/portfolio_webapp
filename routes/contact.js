var path       = require('path'),
    Project    = require(path.resolve('models/Project')),
    Resource   = require(path.resolve('models/Resource')),
    nodemailer = require("nodemailer"),
    mail       = require(path.resolve('config/mail'));

module.exports = function(app) {

    app.post("/contact", function(req, res) {
        // Nodemailer
        // create reusable transport method (opens pool of SMTP connections)
        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: mail.service,
            auth: {
                user: mail.user,
                pass: mail.password
            }
        });

        var receipients = mail.receiver;
        if (req.body.client)
            receipients += ", " + req.body.email;

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from    : req.body.name + " <" + req.body.email + ">",
            to      : receipients,
            subject : "Contact form message from " + req.body.name,
            text    : req.body.message
        };

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }

            smtpTransport.close(); // shut down the connection pool, no more messages
            res.send({success: true});
        });
    });

};