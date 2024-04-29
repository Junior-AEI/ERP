import { AxiosResponse } from 'axios';

interface UserData {
    username: string;
    userId: string;
    mandateStart: string;
    // Ajoutez d'autres propriétés au besoin
}

export function member_info( req: AxiosResponse) {
    if (!req || !req.data || !req.data.data || !req.data.data.users || !req.data.data.users[0]) {
        throw new Error('Données utilisateur non valides dans la réponse Axios.');
    }
    const user : UserData = req.data.data.users[0]
    let message = ` *Information sur l'utilisateur* : ${user.username}
    ID: ${user.userId},
    Mandat: ${user.mandateStart}`;
    return message
    
}
