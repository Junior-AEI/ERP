import {
    Table,
    Column,
    Model,
    DataType,
    NotEmpty,
    IsDate,
    IsIn,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
} from "sequelize-typescript";
import Document from "./document.model";

@Table
export default class Fichier extends Model {
    public static readonly STATUT = [
        "À relire",
        "À modifier",
        "Validé",
        "Signé",
    ];

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

    @IsIn([Fichier.STATUT])
    @Column({
        type: DataType.ENUM,
        values: Fichier.STATUT,
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
