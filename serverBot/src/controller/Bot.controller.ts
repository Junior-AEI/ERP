import TelegramBot from "node-telegram-bot-api";
import { Request, Response } from "express";

const botController = {
    notif,
    connexion,
};

// Remplacez 'YOUR_BOT_TOKEN' par le token que vous avez obtenu de BotFather
const token: string = "6799148322:AAGDIPKp_co22VJQD_Mpplp5vZmqbr5Ldog";

// Créez un nouveau bot en passant le token
const bot = new TelegramBot(token, { polling: true });

async function notif() {
    const message = "notif";
    console.log("test");
    bot.sendMessage(881607628, message);
}

async function connexion(req: Request, res: Response) {
    const message = "Connexion de" + req.body.name;
    console.log("test");
    bot.sendMessage(881607628, message);
}

// Écoutez les messages entrants
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
});

// Gérez les erreurs
bot.on("polling_error", (error) => {
    console.log(error);
});

export default botController;
