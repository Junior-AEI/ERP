import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    IsDate,
    IsIn,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import { Utilisateur } from "./utilisateur.model";

const PERMISSIONS = ["read", "write"];

@Table
export class Permission extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
    })
    nomPermission!: string;

    @IsIn([PERMISSIONS])
    @Column({
        type: DataType.ENUM,
        values: PERMISSIONS,
        allowNull: false,
    })
    typePermission!: string;

    @ForeignKey(() => Utilisateur)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idUtilisateur!: number;

    @BelongsTo(() => Utilisateur)
    utilisateur!: Utilisateur;

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
