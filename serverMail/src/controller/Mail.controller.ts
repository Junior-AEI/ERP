import * as nodemailer from 'nodemailer';
import { Request, Response } from "express";
import createHttpError, { HttpError } from 'http-errors'



const sendEmail = async (req: Request, res: Response) => {
    try {
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
            from: req.body.from, // Votre adresse e-mail OVH
            to: req.body.to, // Adresse mail destinataire
            subject: req.body.subject,
            text: req.body.text
        };

        // Envoi de l'e-mail
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail envoyé : ', info.messageId);

        // Retourner une réponse JSON pour indiquer que l'e-mail a été envoyé avec succès
        return res.status(200).json({
            status: 'success',
            message: 'Email sent successfully',
            messageId: info.messageId
        });
      
    } catch (err ) {
        // En cas d'erreur, retourner une réponse JSON avec un message d'erreur
        console.error('Erreur lors de l\'envoi de l\'e-mail : ', err);
        return res.status(500).json({
            status: 'error',
            message: 'Error sending email',
        });
    }
};


const botController = {
    sendEmail,
  };
  


export default botController;