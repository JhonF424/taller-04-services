const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailConfirmation(customerName, orderNro) {
    return `<!DOCTYPE html>
    <html lang=en>
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Template<title/>
            <style>
                .responsive{
                    width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <img
                src="https://revistapym.com.co/wp-content/uploads/2017/10/Bailo-con-tenis-1.jpg"
                class="responsive"
                alt=""
            />
        </body>
    </html>
    `;
}

function getMessage(emailParams) {
    return {
        to: emailParams.toEmail,
        from: 'jhonfranco424@gmail.com',
        subject: 'Publicidad',
        text: `Hola ${emailParams.customerName}, te enviamos publicidad`,
        html: sendEmailConfirmation(
            emailParams.customerName,
            emailParams.orderNro
        ),
    };
}

async function sendOrder(emailParams) {
    try {
        await sgMail.send(getMessage(emailParams));
        return { message: 'Confiramción de la compra enviada' };
    } catch (err) {
        const message = 'No se pudo enviar la orden de compra. Valide los errores';
        console.error(message);
        console.error(err);
        if (err.response) console.error(err.responde.body);
        return { message };
    }
}

module.exports = {
    sendOrder,
}