import { sequelize } from "../config/database.config";
import { Table, Column, Model, DataType, NotEmpty } from "sequelize-typescript";

@Table
class Document extends Model {
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nom!: string;

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    chemin!: string;
}

sequelize.addModels([Document]);
export default Document;
