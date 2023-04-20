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
    BelongsTo,
    ForeignKey,
} from "sequelize-typescript";
import Utilisateur from "./utilisateur.model";
import Pole from "./pole.model";

@Table
export default class Poste extends Model<Poste> {
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

    @ForeignKey(() => Pole)
    @Column({
        type: DataType.STRING,
    })
    nomPole!: string;

    @BelongsTo(() => Pole)
    pole!: Pole;

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
