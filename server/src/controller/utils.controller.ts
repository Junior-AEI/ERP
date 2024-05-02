import { Response } from 'express'
import { HttpError } from 'http-errors'
import dotenv from 'dotenv'
dotenv.config()
import axios, { AxiosError } from 'axios';
 



/**
 * Check if a string represents a number
 * @param id
 */
export function isNumber(str: string): boolean {
    return /^\d+$/.test(str)
}

/**
 * Generic error handler for controllers
 * @param err Error to handle
 * @param res : Error status and message, 500 by default
 */
export async function controllerErrorHandler(err: HttpError, res: Response) {
    if (process.env.NODE_ENV !== "test") console.error(err)
    if (err.status === undefined) {
        err.status = 500
    }
    if (err.message === undefined) {
        err.message = 'Unknown error'
    }
    return res.status(err.status).json({
        status: err.status,
        message: err.message
    })
}




export const sendEmail = async (to: string, subject: string, text: string, from : string = 'erp-mail@junior-aei.com') => {
    try {
        const mailApiUrl = process.env.MAIL_API_URL;
        await axios.options(`${mailApiUrl}/mail`);
        const response = await axios.post(`${mailApiUrl}/mail`, { from, to, subject, text });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if ((error as AxiosError).response?.status === 404 || (error as AxiosError).code === 'ECONNREFUSED') {
            console.error('Le serveur mail sur le port 5002 est hors ligne ou inaccessible.');
            return { success: false, message: 'Le serveur mail sur le port 5002 est hors ligne ou inaccessible.' };
        } else {
            console.error('Erreur lors de la tentative de communication avec le serveur mail : ', error);
            return { success: false, message: 'Erreur lors de la tentative de communication avec le serveur mail.' };
        }
    }
};



export const sendBotMesssage = async (chatID: number, message: string,) => {
    try {
        const botApiUrl = process.env.BOT_API_URL;
        await axios.options(`${botApiUrl}/send`);
        const response = await axios.post(`${botApiUrl}/send`, { chatID, message });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if ((error as AxiosError).response?.status === 404 || (error as AxiosError).code === 'ECONNREFUSED') {
            console.error('Le serveur bot sur le port 5001 est hors ligne ou inaccessible.');
            return { success: false, message: 'Le serveur bot sur le port 5001 est hors ligne ou inaccessible.' };
        } else {
            console.error('Erreur lors de la tentative de communication avec le serveur bot : ', error);
            return { success: false, message: 'Erreur lors de la tentative de communication avec le serveur bot.' };
        }
    }
};
