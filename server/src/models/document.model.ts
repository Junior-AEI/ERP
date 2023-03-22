import { sequelize } from "../config/database.config";
import {
    Table,
    Column,
    Model,
    DataType,
    NotEmpty,
    HasMany,
    IsDate,
    CreatedAt,
    UpdatedAt,
    Unique,
} from "sequelize-typescript";
import { Fichier } from "./fichier.model";

@Table
export class Document extends Model<Document> {
    @Unique
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nom!: string;

    @HasMany(() => Fichier)
    versions!: Fichier[];

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