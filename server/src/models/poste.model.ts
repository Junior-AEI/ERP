import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    IsDate,
    NotEmpty,
} from "sequelize-typescript";
import { Utilisateur } from "./utilisateur.model";

@Table
export class Poste extends Model<Poste> {
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nom!: string;

    @Column({
        type: DataType.TEXT,
    })
    description!: string;

    @HasMany(() => Utilisateur)
    utilisateurs!: Utilisateur[];

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
