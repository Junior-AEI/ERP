import * as nodemailer from 'nodemailer';

const botController = {
  sendEmail,
};


async function sendEmail() {
  // Configuration du transporteur SMTP
  const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ovh.net',
      port: 587,
      secure: false, // false pour les connexions non sécurisées
      auth: {
          user: 'erp-mail@junior-aei.com', // Votre adresse e-mail OVH
          pass: '*hQ3fFY7X3i$#@3&*@a*ir!c' // Votre mot de passe OVH
      }
  });

  // Options de l'e-mail
  const mailOptions = {
      from: 'erp-mail@junior-aei.com', // Votre adresse e-mail OVH
      to: 'mathieu.chaillon@gmail.com', // Adresse Gmail destinataire
      subject: 'Sujet de l\'e-mail',
      text: 'Corps du message'
  };

  try {
      // Envoi de l'e-mail
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail envoyé : ', info.messageId);
  } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail : ', error);
  }
}



export default botController;