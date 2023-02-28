const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'tutorsrus62@gmail.com',
      pass: 'cshikqpjzgbcwejb'
    }
 });

 const mailOptions = {
    from: 'tutorsrus62@gmail.com', // Sender address
    to: 'm4ll1kap@gmail.com', // List of recipients
    subject: 'JHARNA WAS HERE', // Subject line
    text: 'Hello Mallika, this is jharnaaa', // Plain text body
};

transport.sendMail(mailOptions, function(err, info) {
   if (err) {
     console.log(err)
   } else {
     console.log(info);
   }
});
