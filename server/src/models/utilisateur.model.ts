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
} from "sequelize-typescript";
import { Poste } from "./poste.model";

@Table
export class Utilisateur extends Model<Utilisateur> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nomUtilisateur!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  motDePasse!: string;

  @Column({
    type: DataType.DATE,
  })
  derniereConnexion!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  estActif!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mailJE!: string;

  @ForeignKey(() => Poste)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  posteId!: number;

  @BelongsTo(() => Poste)
  poste!: Poste;

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