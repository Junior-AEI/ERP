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
    IsIn,
} from "sequelize-typescript";
import { Fichier } from "./fichier.model";
@Table
export class Document extends Model {
    public static readonly STATUT = [
        "À relire",
        "À modifier",
        "Validé",
        "Signé",
    ];

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nom!: string;

    @HasMany(() => Fichier)
    versions!: Fichier[];

    @IsIn([Document.STATUT])
    @Column({
        type: DataType.ENUM,
        values: Document.STATUT,
        allowNull: false,
    })
    statut!: string;

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
