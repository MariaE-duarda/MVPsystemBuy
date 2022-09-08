'use strict';
const functions  = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

let url = "smtps://<ravelsoares64@gmail.com>%40gmail.com:"+encodeURIComponent('<Ravel12345>') + "@smtp.gmail.com:465";
let transporter = nodemailer.createTransport(url);

exports.enviarEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let remetente = '"Ravel Soares" <ravelsoares64@gmail.com>';

    let assunto = 'Teste';
    let destinatarios = 'raveloliveira26@gmail.com'; // lista de e-mails destinatarios separados por ,
    let corpo = 'Somente um teste';
    //let corpoHtml = req.body['corpoHtml'];

    let email = {
        from: remetente,
        to: destinatarios,
        subject: assunto,
        text: corpo,
        //html: corpoHtml
    };

    transporter.sendMail(email, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Mensagem %s enviada: %s', info.messageId, info.response);
    });
  });
});
