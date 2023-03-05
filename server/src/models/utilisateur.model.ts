import { sequelize } from "../config/database.config";
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    IsEmail,
    IsDate,
    NotEmpty,
    Unique,
} from "sequelize-typescript";
import { Poste } from "./poste.model";

@Table
export class Utilisateur extends Model {
    @NotEmpty
    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nomUtilisateur!: string;

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    motDePasse!: string;

    @IsDate
    @Column({
        type: DataType.DATE,
    })
    derniereConnexion!: Date;

    @NotEmpty
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        validate: {
            isBoolean: true,
        },
    })
    estActif!: boolean;

    @NotEmpty
    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    debutMandat!: Date;

    @NotEmpty
    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    finMandat!: Date;

    @IsEmail
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    mailJE!: string;

    @ForeignKey(() => Poste)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    posteId!: number;

    @BelongsTo(() => Poste)
    poste!: Poste;

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: Date;

    @IsDate
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updatedAt!: Date;
}

sequelize.addModels([Utilisateur, Poste]);
