import { sequelize } from "../config/database.config";
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Utilisateur } from "./utilisateur.model";

@Table
export class Poste extends Model<Poste> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nom!: string;

  @Column({
    type: DataType.STRING,
  })
  description!: string;

  @HasMany(() => Utilisateur)
  utilisateurs!: Utilisateur[];

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updatedAt!: Date;
}
