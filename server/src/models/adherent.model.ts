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
    IsIn,
    IsDate,
    IsEmail,
    NotEmpty,
    IsNumeric,
    Max,
    Min,
    HasOne,
} from "sequelize-typescript";
import validator from "validator";
import { Adresse } from "./adresse.model";
import { Utilisateur } from "./utilisateur.model";

const GENDER = ["F", "M", "O"];
const PAYMENTS = ["Esp", "CB", "Vir", "Lydia"];
const COURSES = ["Info", "Elec", "Telecom", "Matmeca", "R&I", "SEE"];

@Table
export class Adherent extends Model {
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

    @IsIn([GENDER])
    @Column({
        type: DataType.ENUM,
        values: GENDER,
        allowNull: false,
    })
    sexe!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkPhone(str: string) {
                if (!validator.isMobilePhone(str)) {
                    throw new Error("Invalid phone number");
                }
            },
        },
    })
    telephoneMobile!: string;

    @IsEmail
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @IsDate
    @Column({
        type: DataType.DATEONLY,
    })
    dateNaissance!: Date;

    // TODO : Is birth place useful ?
    @NotEmpty
    @Column({
        type: DataType.STRING,
    })
    lieuNaissance!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkCountry(str: string) {
                if (!validator.isISO31661Alpha3(str)) {
                    throw new Error("Invalid country code");
                }
            },
        },
    })
    nationalite!: string;

    @IsNumeric
    @Max(9999)
    @Min(1920)
    @Column({
        type: DataType.STRING(4),
        allowNull: false,
    })
    promotion!: string;

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dateCotisation!: Date;

    @IsIn([PAYMENTS])
    @Column({
        type: DataType.ENUM,
        values: PAYMENTS,
    })
    moyenPaiement!: string;

    @IsIn([COURSES])
    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values: COURSES,
    })
    filiere!: string;

    @ForeignKey(() => Adresse)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    adresseId!: number;

    @BelongsTo(() => Adresse)
    adresse!: Adresse;

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: Date;

    @HasOne(() => Utilisateur)
    utilisateur!: Utilisateur;

    @IsDate
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updatedAt!: Date;
}
