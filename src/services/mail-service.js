import nodemailer from 'nodemailer';
import config from '../middleware/config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mail_username,
    pass: config.mail_password,
  },
});

function buildMailData(subject, content, to) {
  return {
    from: config.mail_username,
    to: to,
    subject: subject,
    text: content,
    html: content,
  };
}

async function sendMail(subject, content, to) {
  const mailData = buildMailData(subject, content, to);
  return await transporter.sendMail(mailData, (error, info) => {
    if (error) {
      throw error;
    }

    return info;
  });
}

const mailService = {
  sendMail: sendMail,
};

export default mailService;
