var query = require('./query')
var ObjectId = require('mongodb').ObjectID
var nodemailer = require('nodemailer')

//scheduled powercute email notification
exports.scheduledpowercutemail = function (req, next, callback) {
    
  query.schedule(req,next,function(err, email_arr){
    
    const output = `<h3>Electricity Board</h3>
                <p>Important message:</p>
                <p>powercut will happen at ${req.body.date} from <b>${req.body.starttime} to ${req.body.endtime}</b></p>
                `
    nodemailer.createTestAccount((err, account) => {
       
      let transporter = nodemailer.createTransport({
          service: 'Gmail',
          // host: 'smtp.gmail.com',
          // port: 587,
          // secure: false, // true for 465, false for other ports
          auth: {
              user: 'aayushkr90@gmail.com', 
              pass: 'Qwerty12345#' 
          },
         tls: {
              rejectUnauthorized : false
          }
      });
  
      //tagore.eng@gmail.com
      // var email_arr = ['aayushkr10@gmail.com']
      let mailOptions = {
          from: 'aayushkr90@gmail.com', 
          to: email_arr, // list of receivers
          subject: 'Scheduled Powercut', 
        //   text: 'power cut will happen today from 2 pm to 3pm', // plain text body
          html: output // html body
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              //  console.log(error);
               return callback(error)
          }
          console.log("info",info)
          console.log('Message sent: %s', info.messageId);         
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          callback(err, info.messageId)        
      });
    
    });
  
  })
       
}

//ongoing powercute email notification
exports.ongoingpowercutemail = function (req, next, callback) {
    
  query.ongoing(req,next,function(err, email_arr){ 
    
    const output = `<h3>Electricity Board</h3>
                    <p>Important message:</p>
                    <p>Powercut is ongoing and it will last till <b>${req.body.endtime}</b></p>
                    `
    nodemailer.createTestAccount((err, account) => {
       
      let transporter = nodemailer.createTransport({
          service: 'Gmail',
          // host: 'smtp.gmail.com',
          // port: 587,
          // secure: false, // true for 465, false for other ports
          auth: {
              user: 'aayushkr90@gmail.com', 
              pass: 'Qwerty12345#' 
          },
         tls: {
              rejectUnauthorized : false
          }
      });
  
      let mailOptions = {
          from: 'aayushkr90@gmail.com', 
          to: email_arr, // list of receivers
          subject: 'Ongoing Powercut', 
        //   text: 'power cut will happen today from 2 pm to 3pm', // plain text body
          html: output // html body
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
               console.log(error);
               return callback(error)
          }
          console.log("info",info)
          console.log('Message sent: %s', info.messageId);         
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          callback(err, info.messageId)        
      });
    
    });
  
  })
       
}

//ticket creation email notification
exports.ticketcreate = function (req, next, callback) { //console.log(req.body)
    
        var email_arr = [req.body.email]
    
        const output = `<h3>Electricity Board</h3>
                        <p>Ticket Created:</p>
                        <p>Your ticket is been created with title <b>${req.body.tickets.title}</b></p>
                        <p>and your reference number is <b>${req.body.tickets._id}</b></p>
                        `
        nodemailer.createTestAccount((err, account) => {
            
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                // host: 'smtp.gmail.com',
                // port: 587,
                // secure: false, // true for 465, false for other ports
                auth: {
                    user: 'aayushkr90@gmail.com', 
                    pass: 'Qwerty12345#' 
                },
            tls: {
                    rejectUnauthorized : false
                }
            });
        
            let mailOptions = {
                from: 'aayushkr90@gmail.com', 
                to: email_arr, // list of receivers
                subject: 'Ticket created', 
                // text: 'power cut will happen today from 2 pm to 3pm', // plain text body
                html: output // html body
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return callback(error)
                }
                console.log("info",info)
                console.log('Message sent: %s', info.messageId);         
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                callback(err, info.messageId)        
            });
        
        });
         
}


//ticket status change email notification
exports.ticketstatus = function (req, next, callback) { //console.log(req.body)
    
    var email_arr = [req.body.status.email]

    const output = `<h3>Electricity Board</h3>
                    <p>Ticket Status Changed:</p>
                    <p>Your ticket with title <b>${req.body.status.title}</b> and reference number <b>${req.body.status._id}</b></p>
                    <p>status has been changed to <b>${req.body.status.status}</b></p>
                    `
    nodemailer.createTestAccount((err, account) => {
        
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            // host: 'smtp.gmail.com',
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: 'aayushkr90@gmail.com', 
                pass: 'Qwerty12345#' 
            },
        tls: {
                rejectUnauthorized : false
            }
        });
    
        let mailOptions = {
            from: 'aayushkr90@gmail.com', 
            to: email_arr, // list of receivers
            subject: 'Ticket status changed', 
            // text: 'power cut will happen today from 2 pm to 3pm', // plain text body
            html: output // html body
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return callback(error)
            }
            console.log("info",info)
            console.log('Message sent: %s', info.messageId);         
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            callback(err, info.messageId)        
        });
    
    });
     
}


//forgot password reset email 
exports.forgotpassword = function (req, next, callback) { //console.log(req.body)
    // console.log(req.headers.host)
     var email_arr = [req.body.email]

    const output = `<h3>Electricity Board</h3>
                    <h4>Password reset:</h4>
                    <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                    <p>Please click on the following link, or paste this into your browser to complete the process the link is valid only for 1 hour.</p>
                    <p>http://${req.headers.host}/user/reset/${req.body.token.resetPasswordToken}</p>
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`

    nodemailer.createTestAccount((err, account) => {
        
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            // host: 'smtp.gmail.com',
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: 'aayushkr90@gmail.com', 
                pass: 'Qwerty12345#' 
            },
        tls: {
                rejectUnauthorized : false
            }
        });
    
        let mailOptions = {
            from: 'aayushkr90@gmail.com', 
            to: email_arr, // list of receivers
            subject: 'Password Reset Instructions', 
            // text: 'power cut will happen today from 2 pm to 3pm', // plain text body
            html: output // html body
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return callback(error,null)
            }
            console.log("info",info)
            console.log('Message sent: %s', info.messageId);         
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            callback(null, info.messageId)        
        });
    
    });
     
}

//password change confirmation email 
exports.confirmchange = function (req, next, callback) { //console.log(req.body)
     var email_arr = [req.body.email]

    const output = `<h3>Electricity Board</h3>
                    <h4>Password changed confirmation:</h4>
                    <p>'This is a confirmation that the password for your account ${req.body.email} has just been changed.'</p>`
                    
    nodemailer.createTestAccount((err, account) => {
        
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            // host: 'smtp.gmail.com',
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: 'aayushkr90@gmail.com', 
                pass: 'Qwerty12345#' 
            },
        tls: {
                rejectUnauthorized : false
            }
        });
    
        let mailOptions = {
            from: 'aayushkr90@gmail.com', 
            to: email_arr, // list of receivers
            subject: 'Your password has been changed', 
            // text: 'power cut will happen today from 2 pm to 3pm', // plain text body
            html: output // html body
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return callback(error,null)
            }
            console.log("info",info)
            console.log('Message sent: %s', info.messageId);         
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            callback(null, info.messageId)        
        });
    
    });
     
}