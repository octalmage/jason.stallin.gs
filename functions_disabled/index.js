/* eslint-disable comma-dangle */
// Google Cloud Functions doesn't support dangling commas.
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const APP_NAME = 'jason.stallin.gs';

function sendContactEmail(name, email, subject, content) {
  const gmailEmail = encodeURIComponent(functions.config().gmail.email);
  const gmailPassword = encodeURIComponent(functions.config().gmail.password);
  const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

  const mailOptions = {
    from: `${APP_NAME} <octalmage@gmail.com>`,
    to: 'jacerox1234@gmail.com',
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Contact form submission from: ${name}`;
  mailOptions.text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nBody: ${content}`;
  return mailTransport.sendMail(mailOptions).then((error, info) => {
    if (error) {
      return console.log(error);
    }

    return console.log('Message sent: %s', info.messageId);
  });
}

exports.sendContactEmail = functions.https.onRequest((request, response) => {
  if (!request.body.name || !request.body.email || !request.body.subject || !request.body.body) {
    return response.send('Missing parameter.');
  }
  sendContactEmail(
    request.body.name,
    request.body.email,
    request.body.subject,
    request.body.body
  );

  return response.send('Email sent!');
});
