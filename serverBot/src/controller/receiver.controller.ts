import TelegramBot from "node-telegram-bot-api";
import { Request, Response } from "express";
import axios from 'axios'


const receiverController = {
    members,
};

// Remplacez 'YOUR_BOT_TOKEN' par le token que vous avez obtenu de BotFather
const token: string = "6799148322:AAGDIPKp_co22VJQD_Mpplp5vZmqbr5Ldog";
// Créez un nouveau bot en passant le token
const bot = new TelegramBot(token, { polling: true });


async function members( chatId : number) {
    const message = "notif";
    console.log("test");
    bot.sendMessage(chatId, message);
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

