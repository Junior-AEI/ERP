import { sequelize } from "../config/database.config";
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    NotEmpty,
    PrimaryKey,
    IsDate,
} from "sequelize-typescript";
import validator from "validator";

@Table
export class Adresse extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    adresse!: string;

    @Column({
        type: DataType.STRING,
    })
    complementAdresse!: string;

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    ville!: string;

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkPostalCode(pc: string) {
                if (!validator.isPostalCode(pc, "any")) {
                    throw new Error("Invalid postal code !");
                }
            },
        },
    })
    codePostal!: string;

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkCountry(c: string) {
                if (!validator.isISO31661Alpha3(c)) {
                    throw new Error("Invalid country code");
                }
            },
        },
    })
    pays!: string;

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @IsDate
    @UpdatedAt
    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}
