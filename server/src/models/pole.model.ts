import {
    Column,
    CreatedAt,
    DataType,
    HasMany,
    IsDate,
    Model,
    NotEmpty,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import Poste from "./poste.model";

@Table
export default class Pole extends Model<Pole> {
    @PrimaryKey
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nom!: string;

    @HasMany(() => Poste)
    postes!: Poste[];

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
