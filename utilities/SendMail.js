
const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {
    try {
        // Create a nodemailer transporter using Gmail credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-gmail-password',
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'recipient-email@gmail.com',
            subject: 'Test Email from Express.js',
            text: 'Hello, this is a test email from your Express.js application!',
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
}


