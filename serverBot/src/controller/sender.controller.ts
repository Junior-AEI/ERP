import TelegramBot from "node-telegram-bot-api";
import { Request, Response } from "express";

const senderController = {
    notif,
    connexion,
    uploadDoc,
};

// Remplacez 'YOUR_BOT_TOKEN' par le token que vous avez obtenu de BotFather
const token: string = "6799148322:AAGDIPKp_co22VJQD_Mpplp5vZmqbr5Ldog";
const chatID: number = 881607628;
// Créez un nouveau bot en passant le token
const bot = new TelegramBot(token, { polling: true });

async function notif() {
    const message = "notif";
    console.log("test");
    bot.sendMessage(chatID, message);
}

async function connexion(req: Request, res: Response) {
    const message = "Connexion de" + req.body.name;

    console.log("test");
    bot.sendMessage(chatID, message);
}

async function uploadDoc(req: Request, res: Response) {
    const message =
        "Ajout du Document :" +
        req.body.doc +
        "\nEtat du Doc :" +
        req.body.statut;

    console.log("Upload");
    bot.sendMessage(chatID, message);
    return res.status(200).json({
        status: "success",
    });
}



bot.on("polling_error", (error) => {
    console.log(error);
});

export default senderController;
