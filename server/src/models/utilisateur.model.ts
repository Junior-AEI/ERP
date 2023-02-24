import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class Utilisateur extends Model {
    declare nomUtilisateur: string;
    declare estActive: boolean;
    declare derniereConnexion: Date;
    declare motDePasse: string;
}

Utilisateur.init(
    {
        nomUtilisateur: DataTypes.STRING,
        estActive: DataTypes.BOOLEAN,
        derniereConnexion: DataTypes.DATE,
        motDePasse: DataTypes.STRING,
    },
    { sequelize }
);

sequelize.sync();

export { Utilisateur };
