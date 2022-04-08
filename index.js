const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./src/routes');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const app = express();
const {
    logErrors,
    errorHandler,
    boomErrorHandler
} = require('./src/handler/errors.handler')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const sgMailSendGrid = require('./src/emailSendGrid/emailSendGrid');

client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+16165778897',
        to: '+573225585931'
    })
    .then(message => console.log(message.sid));


app.post('/api/v2/sendgrid', async(req, res, next) => {
    try {
        res.json(await sgMailSendGrid.sendOrderSerie(req.body));
    } catch (err) {
        next(err);
    }
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Active port", port);
})

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected with MongoDB"))
    .catch((err) => console.error(err));


app.use(express.json());
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
routerApi(app);