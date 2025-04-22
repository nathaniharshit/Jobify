import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587, 
    secure: false, 
    auth: {
        user: process.env.email, 
        pass: process.env.password, 
    },
    tls: {
        rejectUnauthorized: false, 
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'company@gmail.com', 
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully');
        }
    });
};

export default sendEmail;
