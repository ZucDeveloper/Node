'use strict'

const config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgridkey);

exports.send = async (to, subject, body) => {
  console.log(to, subject, body )
  const msg = {
    to: to,
    from: 'zucdeveloper@gmail.com', 
    subject: subject,
    text: 'and easy to do anywhere, even with Node.js',
    html: body
  };
  sgMail.send(msg) .then(() => {}, error => {
    console.error(error);
 
    if (error.response) {
      console.error(error.response.body)
    }
  });
}

