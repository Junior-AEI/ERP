import { sequelize } from "../config/database.config";
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";

@Table
export class Adresse extends Model {
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
    adresse!: string;

    @Column({
        type: DataType.STRING,
    })
    complementAdresse!: string;

    @Column({
        type: DataType.STRING,
        // allowNull: false,
    })
    ville!: string;

    @Column({
        type: DataType.STRING,
        // allowNull: false,
    })
    codePostal!: boolean;

    @Column({
        type: DataType.STRING,
        // allowNull: false,
    })
    pays!: string;

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

sequelize.addModels([Adresse]);
function PrimaryGeneratedColumn() {
    throw new Error("Function not implemented.");
}

sequelize.addModels([Adresse]);
