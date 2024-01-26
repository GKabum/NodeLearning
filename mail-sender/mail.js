import nodeMail from 'nodemailer';
import {} from 'dotenv/config';

const mailSender = nodeMail.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.SENHA_MAIL
    }
});

const enviarEmail = (to, nome) => {
    mailSender.sendMail({
        from: `Dev Node Test From ${process.env.HTTP_ENVIRONMENT} <${process.env.USER_MAIL}>`,
        to: to,
        subject: `Dev envio de email From ${process.env.HTTP_ENVIRONMENT}`,
        html: `<h1>Olá, ${nome}.</h1><p>Esse e-mail foi enviado usando node.js</p>`,
        text: `Olá, ${nome} Esse e-mail foi enviado usando node.js`
    })
    .then(() => console.log(`E-mail enviado para ${to}`))
    .catch((err) => console.log(`Erro no evio do e-mail para ${to} : ${err}`))
}

export default enviarEmail;