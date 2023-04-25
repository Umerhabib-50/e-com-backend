const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      // user: process.env.SMPT_MAIL,
      // pass: process.env.SMPT_PASSWORD,
      // user: "uh76560@gmail.com",
      // pass: "mvtjwgaymjjxajgi",
      user: "umr.habib@gmail.com",
      pass: "hqhsdnulnlylybfe",
    },
  });

  // umr.habib@gmail.com
  // hqhsdnulnlylybfe
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    // to: "umr.habib@gmail.com",
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
