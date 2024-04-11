const nodeMailer = require("nodemailer")

const sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        }
    });

    const mailOptions = {
        from:"",
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailOptions)
};
module.exports = sendEmail;