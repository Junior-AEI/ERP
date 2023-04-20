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
} from "sequelize-typescript";
import Fichier from "./fichier.model";
@Table
export default class Document extends Model {
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
