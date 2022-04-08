require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailConfirmation(customerName, orderNroSerie) {
    return `

    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Doc</title>
</head>
<body>
    <div class="row">
        <div class="col">
            <label>Prueba desde la app</label>
        </div>
    </div>
    <div class="row">
        <p><small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</small></p>
    </div>
</body>
</html>

    `
}

function getMessage(emailParams) {
    return {
        to: emailParams.toEmail,
        from: 'jhonfranco424@gmail.com',
        subject: 'Confirmación pedido Serie ${NombreSerie}',
        text: `Aaaaaaaaaaaaaaa ${emailParams.customerName}, bbbbbbbbbbbbbbbbbb orden: ${emailParams.orderNroSerie}`,
        html: sendEmailConfirmation(emailParams.customerName, emailParams.orderNroSerie),
    };
}

async function sendOrderSerie(emailParams) {
    try {
        await sgMail.send(getMessage(emailParams));
        return {
            message: 'Confirmacion de pedido recibido, ha sido enviada'
        }
    } catch (e) {
        const message = 'no se pudo enviar la orden de compra al cliente';
        console.error(message);
        console.error(e);

        if (e.response) console.error(error.response.body);
        return {
            message
        }
    }
}

(async ()=>{
    console.log('Se ha enviado el correo electronico');
    await sendOrderSerie();
})

module.exports = {
    sendOrderSerie
}