import { sequelize } from "../config/database.config";
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasOne,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { Adresse } from "./adresse.model";

@Table
export class Adherent extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nom!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    prenom!: string;

    @Column({
        type: DataType.STRING(1),
        allowNull: false,
        // add condition on value in F,M,O (Female, Male, Other)
    })
    sexe!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    telephoneMobile!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        //add condition here for email (cf sequelize)
    })
    email!: string;

    @Column({
        type: DataType.DATEONLY,
    })
    dateNaissance!: Date;

    @Column({
        type: DataType.STRING,
    })
    lieuNaissance!: string;

    @Column({
        type: DataType.STRING,
    })
    nationalite!: string;

    @Column({
        type: DataType.STRING(4),
        // add restriction here for only year of the promotion !
    })
    promotion!: string;

    @Column({
        type: DataType.DATE,
    })
    dateCotisation!: Date;

    @Column({
        type: DataType.STRING,
        // est-ce que on verifie les donnees ici, ou est-ce qu'on le met en
    })
    moyenPaiement!: string;

    @Column({
        type: DataType.STRING,
        // est-ce que on verifie les donnees ici, ou est-ce qu'on le met en
    })
    filiere!: string;

    @ForeignKey(() => Adresse)
    @Column({
        type: DataType.INTEGER,
        // allowNull: false,
    })
    adresseId!: number;

    @BelongsTo(() => Adresse)
    adresse!: Adresse;

    @CreatedAt
    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

sequelize.addModels([Adherent, Adresse]);
