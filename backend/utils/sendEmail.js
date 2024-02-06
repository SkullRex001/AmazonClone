const nodeMailer = require('nodemailer')

const sendEmail = async ({email , subject , message})=> {
    
    const transporter = nodeMailer.createTransport({
        service : process.env.SMPT_HOST,
        port : process.env.SMPT_PORT,
        auth : {
            user : process.env.COMPANY_EMAIL,
            pass : process.env.COMPANY_PASSWORD
        }
    })

    const mailOptions = {
        from : process.env.COMPANY_EMAIL,
        to : email,
        subject : subject,
        text : message
    }



    await transporter.sendMail(mailOptions)

    console.log(mailOptions)


}

module.exports = sendEmail