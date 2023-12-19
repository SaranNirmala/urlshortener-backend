import nodemailer from 'nodemailer';
import env from 'dotenv'

env.config();

export const transporter= nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    },
    tls: {rejectUnauthorized: false}, 
});

export const mailOptions = {
   from:process.env.EMAIL,
   to:'',
   subject:"sending email from URL Shortener",
   tect:'Easy to send email'
}