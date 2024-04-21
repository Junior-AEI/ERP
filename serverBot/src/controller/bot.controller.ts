import TelegramBot from "node-telegram-bot-api";
import { Request, Response } from "express";
import axios, {AxiosError} from 'axios';
import {member_info} from "./format.controller"



// Remplacez 'YOUR_BOT_TOKEN' par le token que vous avez obtenu de BotFather
const token: string = "6799148322:AAGDIPKp_co22VJQD_Mpplp5vZmqbr5Ldog";
// Créez un nouveau bot en passant le token
const bot = new TelegramBot(token, { polling: true });


const sendMessage = async (req: Request, res: Response) => {
    console.log("Test\n")
    const chatID = req.body.chatID
    const message = req.body.message
    bot.sendMessage(chatID, message);
    return res.status(200).json({
        status: "success",
    });
}



async function members( chatId : number) {



    const message = "notif";
    try {
        const dbAPI = process.env.DB_API_URL;
        await axios.options(`${dbAPI}/login`);
        const username : string = "john.doe";
        const login :string = "mdp"
        const res = await axios.post(`${dbAPI}/login`,{ username : username , password : login });

        
        const response = await axios.get(`${dbAPI}/user`,{
            headers: {
              Authorization: `Bearer ${res.data.data.token}`
            }
          });
          if (!response || !response.data || !response.data.data || !response.data.data.users || !response.data.data.users[0]) {
            throw new Error('Données utilisateur non valides dans la réponse.');
        }
          bot.sendMessage(chatId,member_info(response), { parse_mode: 'Markdown' });

    
    } catch (error) {
        if ((error as AxiosError).response?.status === 404 || (error as AxiosError).code === 'ECONNREFUSED') {
            console.error('Le serveur sur le port 5000 est hors ligne ou inaccessible.');
            return { success: false, message: 'Le serveur serveur sur le port 5000 est hors ligne ou inaccessible.' };
        } else {
            console.error('Erreur lors de la tentative de communication avec le serveur  : ', error);
            return { success: false, message: 'Erreur lors de la tentative de communication avec le serveur .' };
        }
    }
}


export function setupMessageHandling() {
    bot.on("message", (msg) => {
        const chatId: number = msg.chat.id;
        if (msg.text == undefined) {
            msg.text = "BONJOUR";
        }
        const messageText = msg.text.toLowerCase(); // Convertir le texte en minuscules pour être insensible à la casse

        if (messageText === "/start") {
            bot.sendMessage(
                chatId,
                "Salut! Je suis votre bot. Tapez /chatID pour obtenir votre ID de chat ou /date pour obtenir la date actuelle.",
            );
        } else if (messageText === "/chatid") {
            bot.sendMessage(chatId, `Votre ID de chat est : ${chatId}`);
        } else if (messageText === "/date") {
            const currentDate = new Date().toLocaleDateString("fr-FR");
            bot.sendMessage(chatId, `La date actuelle est : ${currentDate}`);
        } else if (messageText === "/meilleur") {
            bot.sendMessage(chatId, `Mathieu >> Mathias & Corentin`);
        }
        else if (messageText === "/members") {
            members(chatId)
        }
    });

    bot.on("polling_error", (error) => {
        console.log(error);
    });
}

// Gérez les erreurs
bot.on("polling_error", (error) => {
    console.log(error);
});




bot.on("polling_error", (error) => {
    console.log(error);
});



const senderController = {
    sendMessage
};


export default senderController;
