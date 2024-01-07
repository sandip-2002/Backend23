
const nodemailer = require("nodemailer");

module.exports.sendMail=async function sendMail(str,data){
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "sandipdazzler@gmail.com",
        pass: "qcizlfnpxazgjagv",
      },
    });
    var Osubject,Otext,Ohtml;
    
    if(str=="signup"){
        console.log(str);
        Osubject= `Thank you for signing ${data.name}`;
        Ohtml=`<h1>Welcome to foodApp.com</h1>
                Hope you have a good time
                Here are your details
                Name - ${data.name}
                Email - ${data.email}`
    }
    else if(str=="resetpassword"){
        Osubject='Reset Password';
        Ohtml=`<h1>foodApp.com</h1>
                here is your link to reste your password !
                ${data.resetPasswordLink}`
    }

    const info = await transporter.sendMail({
        from: '"foodApp 🥝" <sandipdazzler@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: Osubject, // Subject line
        html: Ohtml, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
}

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object

//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   //
//   // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//   //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//   //       <https://github.com/forwardemail/preview-email>
//   //
// }

// main().catch(console.error);
