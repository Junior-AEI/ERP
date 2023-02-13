import { Timestamp } from 'bson';
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Utilisateur extends Model<Utilisateur> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING
  })
  nomUtilisateur!: string;

  @Column({
    type: DataType.STRING
  })
  motDePasse!: string;

  @Column({
    type: DataType.DATE
  })
  derniereConnexion!: Timestamp;

  @Column({
    type: DataType.BOOLEAN
  })
  estActif!: boolean;

  @Column({
    type: DataType.STRING
  })
  mailJE!: string;

  // TODO: Implement roles ("postes")

  @CreatedAt
  @Column({
    type: DataType.DATE
  })
  createdAt!: Timestamp;

  @UpdatedAt
  @Column({
    type: DataType.DATE
  })
  updatedAt!: Timestamp;
}