import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

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
