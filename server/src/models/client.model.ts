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
} from "sequelize-typescript";
import validator from "validator";
import { Entreprise } from "./entreprise.model";

const GENDER = ["F", "M", "O"];

@Table
export class Client extends Model {
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fonction!: string;

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
    telephoneFixe!: string;

    @ForeignKey(() => Entreprise)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    entrepriseId!: number;

    @BelongsTo(() => Entreprise)
    entreprise!: Entreprise;

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

sequelize.addModels([Client, Entreprise]);
