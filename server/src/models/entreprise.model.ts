import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    IsDate,
} from "sequelize-typescript";
import Adresse from "./adresse.model";

@Table
export default class Entreprise extends Model {
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
    entiteJuridique!: string;

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

    @IsDate
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updatedAt!: Date;
}
