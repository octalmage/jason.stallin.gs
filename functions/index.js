/* eslint-disable comma-dangle */
// Google Cloud Functions doesn't support dangling commas.
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
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

exports.cacheLatestGithubProject = functions
  .https
  .onRequest((request, response) => { // eslint-disable-line consistent-return
    if (!request.query.username) {
      return response.send('Missing username parameter.');
    }

    response.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    response.removeHeader('pragma');
    response.removeHeader('expires');

    const db = admin.database();
    const ref = db.ref(`cacheLatestGithubProject/${request.query.username}`);

    ref.once('value').then((snapshot) => {
      const entry = snapshot.val();
      if (entry && (Date.now() - entry.timestamp) <= 1000 * 60 * 60) {
        return response.send(entry.data);
      }

      console.log('Refreshing cache.');

      return fetch(`https://api.github.com/users/${request.query.username}/events/public`)
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res;
        })
        .then(res => res.json()).then((res) => {
          console.log(res);
          const data = {
            timestamp: Date.now(),
            data: res,
          };

          ref.set(data);
          return response.send(res);
        })
        .catch(err => response.send(err));
    });
  });
