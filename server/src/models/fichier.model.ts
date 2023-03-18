import { sequelize } from "../config/database.config";
import { Document } from "./document.model";
import {
    Table,
    Column,
    Model,
    DataType,
    NotEmpty,
    IsDate,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
} from "sequelize-typescript";

@Table
export class Fichier extends Model {
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
    chemin!: string;

    @ForeignKey(() => Document)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    documentId!: number;

    @BelongsTo(() => Document)
    document!: Document;

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

sequelize.addModels([Document, Fichier]);
